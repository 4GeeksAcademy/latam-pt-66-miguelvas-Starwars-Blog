import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ uid, name, resource }) => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.uid === uid && fav.type === resource);

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'remove_favorite', payload: { uid, type: resource } });
        } else {
            dispatch({ type: 'add_favorite', payload: { uid, name, type: resource } });
        }
    };

    return (  
        <div className="card me-5 shadow-sm border-none" style={{ width: "18rem", flexShrink: 0, backgroundColor: "#1d1e20" }}>
            <img src="https://loremflickr.com/300/200" className="card-img-top img-fluid" alt="..."/>
            <div className="card-body">
                <h5 className="card-title" style={{fontFamily: 'StarJedi'}}>{name}</h5> {/*Esto es una prop*/}
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
                <button className="btn btn-outline-warning" style={{fontFamily: 'StarJedi'}} onClick={() => navigate(`/single/${resource}/${uid}`)}>Learn more</button> 
                <button className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`} onClick={handleFavorite}> 
                    <i className={`fa-solid fa-star ${isFavorite ? 'text-black' : ''}`}></i>
                </button>
            </div>
        </div>
    );
}