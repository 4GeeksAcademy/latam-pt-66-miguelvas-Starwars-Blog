import { Card } from "./Card";

export const Slider = ({ title }) => {

    return (
        <div className="container mt-5">
            <h2 className="text-warning" style={{fontFamily: 'StarJedi'}}>{title}</h2> {/*Esto es una prop*/}
            <div className="d-flex overflow-auto pb-5 scroll">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}