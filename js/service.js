class PortfolioService {
    constructor() {
        this.db = null;
        this.auth = null;
        this.provider = null;
        this.firebaseInitialized = false;
    }

    /**
     * รับ dependency injection ของ Firebase จากภายนอก
     */
    initFirebase(firebaseApp) {
        if (!firebaseApp) return;
        this.auth = firebaseApp.auth;
        this.db = firebaseApp.db;
        this.provider = firebaseApp.provider;
        this.signInWithPopup = firebaseApp.signInWithPopup;
        this.signOut = firebaseApp.signOut;
        this.doc = firebaseApp.doc;
        this.getDoc = firebaseApp.getDoc;
        this.setDoc = firebaseApp.setDoc;
        this.firebaseInitialized = true;
        console.log("PortfolioService: Firebase Initialized");
    }

    // Safe Default Data Getter
    get defaultData() {
        return window.PortfolioApp.DEFAULT_DATA || {
            personalInfo: { name: "Loading...", role: "Developer" },
            titles: { projects: "Projects", skills: "Skills", about: "About", contact: "Contact" },
            projects: [],
            skillCategories: []
        };
    }

    // --- Authentication Methods ---

    async login() {
        if (!this.firebaseInitialized) {
            alert("Firebase config missing! Please check index.html");
            return null;
        }
        try {
            const result = await this.signInWithPopup(this.auth, this.provider);
            return result.user;
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login Failed: " + error.message);
            throw error;
        }
    }

    async logout() {
        if (!this.firebaseInitialized) return;
        await this.signOut(this.auth);
    }

    // --- Data Management Methods ---

    /**
     * Load Data: Strategy Pattern
     */
    async loadData(userId = null) {
        if (!userId || !this.firebaseInitialized) {
            console.log("Loading Default Data (Offline/Public Mode)");
            return this.defaultData;
        }

        try {
            const docRef = this.doc(this.db, "portfolios", userId);
            const docSnap = await this.getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Data loaded from Firebase Cloud");
                return { ...this.defaultData, ...docSnap.data() };
            } else {
                console.warn("No cloud data found for user, using default.");
                return this.defaultData;
            }
        } catch (e) {
            console.error("Error loading cloud data:", e);
            return this.defaultData;
        }
    }

    /**
     * คัดกรองและแก้ปัญหา Nested Arrays และค่า null เพื่อให้ผ่านมาตรฐาน Firestore แบบ 100% (Deep Scrubber)
     */
    sanitizeForFirestore(obj) {
        // ตัดค่าที่ตายตัวหรือว่างเปล่า
        if (obj === null || obj === undefined) return null;

        if (Array.isArray(obj)) {
            // ขั้นที่ 1: กรอง null และ undefined ออกจาก Array (Firestore ไม่รองรับ Array ที่มีค่าว่างแบบนี้)
            const validItems = obj.filter(item => item !== null && item !== undefined);
            
            return validItems.map(item => {
                // ขั้นที่ 2: เช็คกฎเหล็ก ห้ามมี Array ซ้อน Array ตรงๆ ไม่ว่าจะอยู่ลึกแค่ไหน
                if (Array.isArray(item)) {
                    // ถ้าเจอ ให้แปลงร่างเป็น Object ทันที { "0": ..., "1": ... }
                    const safeObj = {};
                    item.forEach((val, idx) => {
                        if (val !== null && val !== undefined) {
                            safeObj[idx] = this.sanitizeForFirestore(val);
                        }
                    });
                    return safeObj;
                }
                return this.sanitizeForFirestore(item);
            });
        }

        if (typeof obj === 'object') {
            const cleaned = {};
            for (const [key, value] of Object.entries(obj)) {
                // ไม่บันทึก key ที่มีค่าเป็น undefined/null เพื่อประหยัดพื้นที่และป้องกัน Error
                if (value !== undefined && value !== null) {
                    cleaned[key] = this.sanitizeForFirestore(value);
                }
            }
            return cleaned;
        }

        return obj;
    }

    /**
     * Save Data
     */
    async saveData(data, userId) {
        if (!userId) throw new Error("User not authenticated");
        if (!this.firebaseInitialized) throw new Error("Firebase not initialized");

        try {
            // 1. กรองให้เหลือแค่ JSON เพื่อตัดฟังก์ชัน หรือตัวแปรแปลกปลอม
            const plainData = JSON.parse(JSON.stringify(data));
            
            // 2. ใช้ระบบ Sanitize ขัดเกลาข้อมูลขั้นสุด
            const cleanData = this.sanitizeForFirestore(plainData);

            // 3. ตรวจสอบขนาดข้อมูลก่อนส่ง (Firestore รับได้สูงสุด 1MB)
            const jsonString = JSON.stringify(cleanData);
            const sizeInBytes = new Blob([jsonString]).size;
            
            // เผื่อพื้นที่ให้ส่วนหัวข้อความ (Headers) ของ Firebase จึงตั้งเตือนไว้ที่ ~900KB
            if (sizeInBytes > 900000) { 
                const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
                alert(`🚨 เซฟไม่ผ่าน! ข้อมูลปัจจุบันมีขนาด ${sizeInMB} MB ซึ่งใกล้เกินขีดจำกัดแล้ว\n\nฐานข้อมูลรองรับได้สูงสุดแค่ 1 MB ต่อคน (ปัญหาเกิดจากรูปภาพ)\n\nวิธีแก้:\n1. ลบรูปโปรเจกต์เก่าที่ขนาดใหญ่ๆ ออกบ้าง\n2. แล้วค่อยลองอัปโหลดรูปกลับเข้าไปใหม่ (ระบบปรับบีบอัดรูปให้เล็กลงแล้ว)`);
                return false;
            }
            
            await this.setDoc(this.doc(this.db, "portfolios", userId), cleanData);
            return true;
        } catch (e) {
            console.error("Save Error:", e);
            alert("บันทึกไม่สำเร็จ! อาจมีปัญหาเรื่องการเชื่อมต่อฐานข้อมูล: " + e.message);
            return false;
        }
    }

    // --- Utility Methods ---

    processFile(file, callback) {
        if (!file) return;

        // ถ้าไม่ใช่รูปภาพ ให้ทำงานตามปกติ
        if (!file.type.startsWith('image/')) {
            if (file.size > 1048576) { // 1MB Check
                alert("Warning: File is too large (>1MB). Firestore may reject this.");
            }
            const reader = new FileReader();
            reader.onloadend = () => callback(reader.result);
            reader.readAsDataURL(file);
            return;
        }

        // ระบบบีบอัดรูปภาพอัตโนมัติ (Auto-compression) สำหรับไฟล์ภาพ
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                // ปรับขนาดกว้าง/ยาวให้เล็กลงอีก เพื่อรองรับการเก็บได้หลายโปรเจกต์
                const MAX_WIDTH = 600;
                const MAX_HEIGHT = 600;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // แปลงเป็น JPEG และบีบอัดคุณภาพลงมาเหลือ 60% เพื่อเซฟพื้นที่ขั้นสุด
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
                
                callback(compressedBase64);
            };
        };
    }

    updateField(currentData, pathArray, newValue) {
        const newData = { ...currentData };
        let current = newData;
        for (let i = 0; i < pathArray.length - 1; i++) {
            current[pathArray[i]] = Array.isArray(current[pathArray[i]]) 
                ? [...current[pathArray[i]]] 
                : { ...current[pathArray[i]] };
            current = current[pathArray[i]];
        }
        current[pathArray[pathArray.length - 1]] = newValue;
        return newData;
    }
}

// Singleton Instance
window.PortfolioApp.portfolioService = new PortfolioService();