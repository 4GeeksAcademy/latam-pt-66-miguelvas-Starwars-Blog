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

export const getPerson = async (uid) => {     // El uid es el identificador único de cada persona en la API de Star Wars. Se utiliza para construir la URL específica para obtener los detalles de esa persona.

    const URL_PERSON = `${URL_BASE}/people/${uid}`;
    try {
        const response = await fetch(URL_PERSON);
        const data = await response.json();
        return data.result.properties;
            // * LO QUE ME RETORNA 
            // "created": "2026-03-08T22:10:58.143Z",
            // "edited": "2026-03-08T22:10:58.143Z",
            // "name": "Luke Skywalker",
            // "gender": "male",
            // "skin_color": "fair",
            // "hair_color": "blond",
            // "height": "172",
            // "eye_color": "blue",
            // "mass": "77",
            // "homeworld": "https://www.swapi.tech/api/planets/1",
            // "birth_year": "19BBY",
            // "vehicles": [
            //     "https://www.swapi.tech/api/vehicles/14",
            //     "https://www.swapi.tech/api/vehicles/30"
            // ],
            // "starships": [
            //     "https://www.swapi.tech/api/starships/12",
            //     "https://www.swapi.tech/api/starships/22"
            // ],
            // "films": [
            //     "https://www.swapi.tech/api/films/1",
            //     "https://www.swapi.tech/api/films/2",
            //     "https://www.swapi.tech/api/films/3",
            //     "https://www.swapi.tech/api/films/6"
            // ],
            // "url": "https://www.swapi.tech/api/people/1"
    } catch (error) {
        console.error("Error fetching person:", error);
        return null;
    }
}

export const getVehicle = async (uid) => {
    const URL_VEHICLE = `${URL_BASE}/vehicles/${uid}`;
    try {
        const response = await fetch(URL_VEHICLE);
        const data = await response.json();
        return data.result.properties;
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        return null;
    }
}

export const getPlanet = async (uid) => {
    const URL_PLANET = `${URL_BASE}/planets/${uid}`;
    try {
        const response = await fetch(URL_PLANET);
        const data = await response.json();
        return data.result.properties;
    } catch (error) {
        console.error("Error fetching planet:", error);
        return null;
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