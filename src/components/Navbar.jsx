import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const URL_BASE = "http://localhost:3001";

    const getDetails = (fav) => {
        if (fav.name) {
            return { 
                name: fav.name, 
                type: fav.people_id ? "people" : fav.planet_id ? "planets" : "vehicles", 
                id: fav.people_id || fav.planet_id || fav.vehicle_id 
            };
        }

        const findItem = (list, id) => list?.find(item => item.uid == id || item.id == id || item.result?.uid == id);
        
        if (fav.people_id) {
            const item = findItem(store.people, fav.people_id);
            return { name: item?.name || item?.properties?.name || "Personaje", type: "people", id: fav.people_id };
        }
        if (fav.planet_id) {
            const item = findItem(store.planets, fav.planet_id);
            return { name: item?.name || item?.properties?.name || "Planeta", type: "planets", id: fav.planet_id };
        }
        if (fav.vehicle_id) {
            const item = findItem(store.vehicles, fav.vehicle_id);
            return { name: item?.name || item?.properties?.name || "Vehículo", type: "vehicles", id: fav.vehicle_id };
        }
        return { name: "Desconocido", type: "", id: null };
    };

    const deleteFavorite = async (fav) => {
        const { id, type } = getDetails(fav);
        const endpoint = type === "people" ? "people" : type === "planets" ? "planet" : "vehicle";
        if (!id) return;

        try {
            await fetch(`${URL_BASE}/favorite/${endpoint}/${id}`, { method: 'DELETE' });
            const res = await fetch(`${URL_BASE}/users/favorites`);
            const data = await res.json();
            dispatch({ type: 'set_favorites', payload: data });
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex align-items-center justify-content-between">
                <Link to="/" className="d-flex align-items-center text-decoration-none">
                    <img src="/starwars_icon_.ico" alt="Star Wars" width="50" height="50" />
                </Link>

                <Link to="/" className="text-decoration-none">
                    <span className="navbar-brand mb-0 fs-1 ms-5 text-warning" style={{fontFamily: 'StarJhol'}}>Starwars Blog</span>
                </Link>
                
                <div className="dropdown">
                    <button className="btn btn-outline-warning dropdown-toggle text-light" type="button" data-bs-toggle="dropdown" style={{ fontFamily: 'StarJedi' }}>
                        Favorites <span className="badge bg-warning text-dark">{store.favorites.length}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        {store.favorites.length === 0 ? (
                            <li><span className="dropdown-item">No favorites yet</span></li>
                        ) : (
                            store.favorites.map((fav, index) => {
                                const details = getDetails(fav);
                                return (
                                    <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                        <Link className="text-decoration-none text-light" to={`/single/${details.type}/${details.id}` } style={{ fontFamily: 'StarJedi' }}>
                                            {details.name}
                                        </Link>
                                        <button className="btn btn-outline-danger btn-sm ms-3 border-0" onClick={() => deleteFavorite(fav)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};