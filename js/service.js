class PortfolioService {
    constructor(storageKey = 'portfolioData') {
        this.storageKey = storageKey;
    }

    // Load data from LocalStorage
    loadData() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Data corruption detected, loading default.", e);
                return window.PortfolioApp.DEFAULT_DATA;
            }
        }
        return window.PortfolioApp.DEFAULT_DATA;
    }

    // Save data to LocalStorage
    saveData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error("Save failed", e);
            return false;
        }
    }

    // Helper to update deep nested objects
    updateField(currentData, pathArray, newValue) {
        const newData = { ...currentData };
        let current = newData;
        for (let i = 0; i < pathArray.length - 1; i++) {
            // Clone level
            current[pathArray[i]] = Array.isArray(current[pathArray[i]]) 
                ? [...current[pathArray[i]]] 
                : { ...current[pathArray[i]] };
            current = current[pathArray[i]];
        }
        current[pathArray[pathArray.length - 1]] = newValue;
        return newData;
    }

    // Convert File to Base64
    processFile(file, callback) {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result);
        reader.readAsDataURL(file);
    }
}

// Instantiate Global Service Object
window.PortfolioApp.portfolioService = new PortfolioService();