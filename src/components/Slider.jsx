import { Card } from "./Card";

export const Slider = ({ title, results, resource }) => {
    return (
        <div className="container mt-5">
            <h2 className="text-white" style={{fontFamily: 'StarJedi'}}>
                {title}
            </h2>
            <hr className="border-0 opacity-100 bg-secondary" style={{height: '2px'}}/>
            <div className="d-flex overflow-auto pb-5 scroll">
                {results.map((result, index) => {
                    // Elegimos el ID correcto: buscamos uid, si no id, si no el index
                    const id = result.uid || result.id || index;
                    
                    return (
                        <Card 
                            key={id}
                            uid={id}
                            name={result.name}
                            resource={resource}
                        />
                    );
                })}
            </div>
        </div>
    );
}