import { Card } from "./Card";

export const Slider = ({ title }) => {

    return (
        <div className="container mt-5">
            <h2 className="text-warning" style={{fontFamily: 'StarJedi'}}>
                {title}
            </h2>
            <hr className="border-0 opacity-100 bg-secondary" style={{height: '2px'}}/>
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