class PortfolioService {
    constructor() {
        this.db = null;
        this.auth = null;
        this.provider = null;
        this.firebaseInitialized = false;
    }

    /**
     * รับ dependency injection ของ Firebase จากภายนอก (เพื่อให้ Test ง่ายและลด Coupling)
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
        // Strategy 1: Public/Offline Mode
        if (!userId || !this.firebaseInitialized) {
            console.log("Loading Default Data (Offline/Public Mode)");
            return this.defaultData;
        }

        // Strategy 2: Authenticated Cloud Mode
        try {
            const docRef = this.doc(this.db, "portfolios", userId);
            const docSnap = await this.getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Data loaded from Firebase Cloud");
                // Merge with default to ensure structure exists (prevents undefined errors on new fields)
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
     * Save Data
     */
    async saveData(data, userId) {
        if (!userId) throw new Error("User not authenticated");
        if (!this.firebaseInitialized) throw new Error("Firebase not initialized");

        try {
            await this.setDoc(this.doc(this.db, "portfolios", userId), data);
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