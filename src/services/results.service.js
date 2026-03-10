const URL_BASE = "https://www.swapi.tech/api";
const URL_BASE_IMG ="https://akabab.github.io/starwars-api/api/all.json"

// generic fetcher for a single resource; returns data.result.properties
export const getResource = async (type, uid) => {
    const url = `${URL_BASE}/${type}/${uid}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.result.properties;
    } catch (error) {
        console.error(`Error fetching ${type} ${uid}:`, error);
        return null;
    }
};

// convenience wrappers for backward compatibility
export const getPerson = (uid) => getResource("people", uid);
export const getVehicle = (uid) => getResource("vehicles", uid);
export const getPlanet = (uid) => getResource("planets", uid);

export const getPeople = async (page, limit) => {
    const URL_PEOPLE = `${URL_BASE}/people?page=${page}&limit=${limit}`;
    try {
        const response = await fetch(URL_PEOPLE);
        const data = await response.json(); 
        return data.results;  // ESTO ES LO QUE ME RETORNA: { "uid": "1", "name": "Luke Skywalker", "url": "https://www.swapi.tech/api/people/1" }
    } catch (error) {
        console.error("Error fetching people:", error);
        return [];
    }
}


export const getVehicles = async (page, limit) => {
    const URL_VEHICLES = `${URL_BASE}/vehicles?page=${page}&limit=${limit}`;
    try {
        const response = await fetch(URL_VEHICLES);
        const data = await response.json(); 
        return data.results; // ESTO ES LO QUE ME RETORNA: { "uid": "4", "name": "Sand Crawler", "url": "https://www.swapi.tech/api/vehicles/4" }
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return [];
    }
}

export const getPlanets = async (page, limit) => {
    const URL_PLANETS = `${URL_BASE}/planets?page=${page}&limit=${limit}`;
    try {
        const response = await fetch(URL_PLANETS);
        const data = await response.json(); 
        return data.results;  // ESTO ES LO QUE ME RETORNA: { "uid": "1", "name": "Tatooine", "url": "https://www.swapi.tech/api/planets/1" }
    } catch (error) {
        console.error("Error fetching planets:", error);
        return [];
    }
}



export const getImage = async (name) => {
    try {
        const response = await fetch(URL_BASE_IMG);
        const data = await response.json(); 
        const character = data.find(item => item.name === name);

        if (character) {
            return character.image;
        } else {
            console.log("No se encontró la imagen para:", name);
            return "https://via.placeholder.com/400x600?text=No+Image"; 
        }

    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
};