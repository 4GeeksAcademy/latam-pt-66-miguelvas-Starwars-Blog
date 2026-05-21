import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <Link to="/" className="d-flex align-items-center text-decoration-none">
                        <img src="/starwars_icon_.ico" alt="Star Wars Icon" width="50" height="50" className="d-inline-block align-top mr-2" />
                    </Link>
                </div>
                <div className="d-flex justify-content-center flex-grow-1">
                    <Link to="/" className="d-flex align-items-center text-decoration-none">
                        <span className="navbar-brand mb-0 text-decoration-none fs-1 ms-5 text-warning" style={{fontFamily: 'StarJhol'}}>Starwars Blog</span>
                    </Link>
                </div>
                <div className="d-flex align-items-center">
                    <div className="dropdown">
                        <button className="btn btn-outline-warning dropdown-toggle text-light" type="button" data-bs-toggle="dropdown" style={{fontFamily: 'StarJedi'}}>
                            Favorites <span className="badge bg-warning text-dark">{store.favorites.length}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            {store.favorites.length === 0 ? (
                                <li><span className="dropdown-item">No favorites yet</span></li>
                            ) : (
                                store.favorites.map((fav) => (
                                    <li key={fav.uid} className="dropdown-item d-flex justify-content-between align-items-center">
                                        <Link className="text-decoration-none text-light" to={`/single/${fav.type}/${fav.uid}`}>
                                            {fav.name}
                                        </Link>
                                        <button 
                                            className="btn btn-outline-danger btn-sm ms-3 border-0" 
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                dispatch({ type: 'remove_favorite', payload: { uid: fav.uid, type: fav.type } });
                                            }}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </li>
                                ))
                            )}
                            {store.favorites.length > 0 && (
                                <>
                                    <li><hr className="dropdown-divider" style={{background: "white"}} /></li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={() => dispatch({ type: 'remove_all_favorites' })}>
                                            <i className="fa-solid fa-trash"></i> Clear all
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};