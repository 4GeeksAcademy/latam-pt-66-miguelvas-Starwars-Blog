import { Slider } from "../components/Slider";

const URL_BASE = "https://www.swapi.tech/api";
const URL_PEOPLE = `${URL_BASE}/people`;
const URL_PLANETS = `${URL_BASE}/planets`;
const URL_VEHICLES = `${URL_BASE}/vehicles`;


export const Home = () => {

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<Slider 
				title = "Characters"
			/>
			<Slider 
				title = "Vehicles"
			/>
			<Slider 
				title = "Planets"
			/>
		</div>
	);
}; 