const URL_BASE = "http://localhost:3001"; // API de Flask
const URL_BASE_IMG = "https://akabab.github.io/starwars-api/api/all.json";

// --- ENDPOINTS PARA PERSONAJES ---
export const getPeople = async () => {
    try {
        const response = await fetch(`${URL_BASE}/people`);
        if (!response.ok) return [];
        return await response.json(); 
    } catch (error) {
        console.error("Error fetching people:", error);
        return [];
    }
};

export const getPerson = async (uid) => {
    try {
        const response = await fetch(`${URL_BASE}/people/${uid}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Error fetching person:", error);
        return null;
    }
};

// --- ENDPOINTS PARA PLANETAS ---
export const getPlanets = async () => {
    try {
        const response = await fetch(`${URL_BASE}/planets`);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error("Error fetching planets:", error);
        return [];
    }
};

export const getPlanet = async (uid) => {
    try {
        const response = await fetch(`${URL_BASE}/planets/${uid}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Error fetching planet:", error);
        return null;
    }
};

// --- ENDPOINTS PARA VEHÍCULOS ---
export const getVehicles = async () => {
    try {
        const response = await fetch(`${URL_BASE}/vehicles`);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return [];
    }
};

export const getVehicle = async (uid) => {
    try {
        const response = await fetch(`${URL_BASE}/vehicles/${uid}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        return null;
    }
};

// --- IMÁGENES (API EXTERNA) ---
export const getImage = async (name) => {
    try {
        const response = await fetch(URL_BASE_IMG);
        const data = await response.json(); 
        const character = data.find(item => item.name === name);
        return character ? character.image : "https://via.placeholder.com/400x600?text=No+Image";
    } catch (error) {
        console.error("Error fetching image:", error);
        return "https://via.placeholder.com/400x600?text=No+Image";
    }
};