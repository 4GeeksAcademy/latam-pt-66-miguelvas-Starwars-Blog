import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ uid, name, resource }) => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const URL_BASE = "http://localhost:3001";

    // Verificamos si es favorito comparando IDs de forma flexible (==)
    const isFavorite = store.favorites.some(fav => {
        if (resource === "people") return fav.people_id == uid;
        if (resource === "planets") return fav.planet_id == uid;
        if (resource === "vehicles") return fav.vehicle_id == uid;
        return false;
    });

    const handleFavorite = async () => {
        const endpoint = resource === "people" ? "people" : resource === "planets" ? "planet" : "vehicle";
        const url = `${URL_BASE}/favorite/${endpoint}/${uid}`;
        const method = isFavorite ? 'DELETE' : 'POST';
        
        try {
            const response = await fetch(url, { 
                method: method,
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                // Sincronizamos con el backend pidiendo la lista actualizada
                const res = await fetch(`${URL_BASE}/users/favorites`);
                const data = await res.json();
                
                // Actualizamos el estado global con la lista real de la base de datos
                dispatch({ type: 'set_favorites', payload: data });
            } else {
                console.error("Error al actualizar favorito en el servidor");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (  
        <div className="card me-5 shadow-sm border-none" style={{ width: "18rem", flexShrink: 0, backgroundColor: "#1d1e20" }}>
            <img src="https://loremflickr.com/300/200" className="card-img-top img-fluid" alt={name}/>
            <div className="card-body">
                <h5 className="card-title" style={{fontFamily: 'StarJedi', color: 'white'}}>{name}</h5>
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
                <button 
                    className="btn btn-outline-warning" 
                    style={{fontFamily: 'StarJedi'}} 
                    onClick={() => navigate(`/single/${resource}/${uid}`)}
                >
                    Learn more
                </button> 
                <button 
                    className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`} 
                    onClick={handleFavorite}
                > 
                    <i className={`fa-solid fa-star ${isFavorite ? 'text-black' : ''}`}></i>
                </button>
            </div>
        </div>
    );
};