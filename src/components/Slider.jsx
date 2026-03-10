import { Card } from "./Card";

export const Slider = ({ title, results, resource }) => {
    return (
        <div className="container mt-5">
            <h2 className="text-white" style={{fontFamily: 'StarJedi'}}>
                {title}
            </h2>
            <hr className="border-0 opacity-100 bg-secondary" style={{height: '2px'}}/>
            <div className="d-flex overflow-auto pb-5 scroll">
                {results.map((result) => (
                    <Card 
                        key={result.uid}
                        uid={result.uid}
                        name={result.name}
                        resource={resource}
                    />
                ))}
            </div>
        </div>
    );
}