import { Slider } from "../components/Slider";

export const Home = () => {

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<Slider 
				title = "Characters"
			/>
			<hr />
			<Slider 
				title = "vehicles"
			/>
			<hr />
			<Slider 
				title = "Planets"
			/>
		</div>
	);
}; 