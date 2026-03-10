import { useState, useEffect } from "react";
import { getPeople, getVehicles, getPlanets } from "../services/results.service";
import { Slider } from "../components/Slider";

export const Home = () => {
    const [people, setPeople] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {         
        const fetchPeople = async () => {
            setLoading(true);
            const peopleData = await getPeople(1,10);
            setPeople(peopleData);
            setLoading(false);
        };
        fetchPeople();
    }, []);

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            const vehicleData = await getVehicles(1,10);
            setVehicles(vehicleData);
            setLoading(false)
        };
        fetchVehicles();
    }, [])

    useEffect(() => {
        const fetchPlanets = async () => {
            setLoading(true);
            const planetsData = await getPlanets(1,10);
            setPlanets(planetsData);
            setLoading(false);
        };
        fetchPlanets();
    }, []);


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Slider 
                title="characters"
                resource="people"
                results={people}  // LE ENVIO COMO PROP EL ESTADO QUE CONTIENE LOS PERSONAJES OBTENIDOS DE LA API, PARA QUE EL COMPONENTE SLIDER LOS RENDERICE EN PANTALLA
            />
            <Slider 
                title="vehicles"
                resource="vehicles"
                results={vehicles}
            />
            <Slider 
                title="planets"
                resource="planets"
                results={planets}
            />
        </div>
    );
};


// CONTENIDO DE CADA RESULT 

// [
//         {
//             "uid": "1",
//             "name": "Luke Skywalker",
//             "url": "https://www.swapi.tech/api/people/1"
//         },
//         {
//             "uid": "2",
//             "name": "C-3PO",
//             "url": "https://www.swapi.tech/api/people/2"
//         },
//         {
//             "uid": "3",
//             "name": "R2-D2",
//             "url": "https://www.swapi.tech/api/people/3"
//         },
//         {
//             "uid": "4",
//             "name": "Darth Vader",
//             "url": "https://www.swapi.tech/api/people/4"
//         },
//         {
//             "uid": "5",
//             "name": "Leia Organa",
//             "url": "https://www.swapi.tech/api/people/5"
//         },
//         {
//             "uid": "6",
//             "name": "Owen Lars",
//             "url": "https://www.swapi.tech/api/people/6"
//         },
//         {
//             "uid": "7",
//             "name": "Beru Whitesun lars",
//             "url": "https://www.swapi.tech/api/people/7"
//         },
//         {
//             "uid": "8",
//             "name": "R5-D4",
//             "url": "https://www.swapi.tech/api/people/8"
//         },
//         {
//             "uid": "9",
//             "name": "Biggs Darklighter",
//             "url": "https://www.swapi.tech/api/people/9"
//         },
//         {
//             "uid": "10",
//             "name": "Obi-Wan Kenobi",
//             "url": "https://www.swapi.tech/api/people/10"
//         }
//     ]