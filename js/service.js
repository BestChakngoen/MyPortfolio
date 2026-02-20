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
     * คัดกรองและแก้ปัญหา Nested Arrays เพื่อให้ผ่านมาตรฐาน Firestore
     */
    sanitizeForFirestore(obj, insideArray = false) {
        if (obj === null || obj === undefined) return null;
        
        // จัดการกรณีเป็น Array
        if (Array.isArray(obj)) {
            if (insideArray) {
                // หากเจอ Array ซ้อนอยู่ใน Array Firestore จะแจ้ง invalid nested entity ทันที
                // เราจึงแปลงเป็น Object แบบระบุ Index {0: val, 1: val} เพื่อให้บันทึกผ่าน
                const safeObject = {};
                obj.forEach((val, idx) => {
                    safeObject[idx] = this.sanitizeForFirestore(val, true);
                });
                return safeObject;
            }
            // ระบุสถานะว่าลูปนี้กำลังทำงานอยู่ข้างใน Array
            return obj.map(item => this.sanitizeForFirestore(item, true));
        }
        
        // จัดการกรณีเป็น Object
        if (typeof obj === 'object') {
            const cleaned = {};
            for (const [key, value] of Object.entries(obj)) {
                if (value !== undefined) {
                    // หากข้างใน Object มี Array ให้เริ่มนับสถานะ insideArray ใหม่ (เพราะ Firestore ยอมรับ Object ซ้อน Array ได้)
                    cleaned[key] = this.sanitizeForFirestore(value, false);
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
            // [แก้ไขเพื่อป้องกัน Error แบบ 100%]
            // 1. กรองให้เหลือแค่ JSON เพื่อตัดฟังก์ชัน หรือตัวแปรแปลกปลอม
            const plainData = JSON.parse(JSON.stringify(data));
            
            // 2. ใช้ระบบ Sanitize เพื่อจัดการโครงสร้าง Array เจ้าปัญหา
            const cleanData = this.sanitizeForFirestore(plainData);
            
            await this.setDoc(this.doc(this.db, "portfolios", userId), cleanData);
            return true;
        } catch (e) {
            console.error("Save Error:", e);
            return false;
        }
    }

    // --- Utility Methods ---

    processFile(file, callback) {
        if (!file) return;
        if (file.size > 1048576) { // 1MB Check
            alert("Warning: File is too large (>1MB). Firestore may reject this.");
        }
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result);
        reader.readAsDataURL(file);
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