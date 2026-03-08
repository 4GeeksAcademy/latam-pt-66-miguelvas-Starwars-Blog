import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container d-flex align-items-center justify-content-between">
				<Link to="/" className="d-flex align-items-center text-decoration-none">
					<img src="/starwars_icon_.ico" alt="Star Wars Icon" width="50" height="50" className="d-inline-block align-top mr-2" />
					<span className="navbar-brand mb-0 ms-3 h1 text-decoration-none fs-3" style={{fontFamily: 'StarJedi'}}>Starwars Blog</span>
				</Link>
				<div className="ml-auto">
						<div className="dropdown">
							<button className="btn btn-outline-warning dropdown-toggle text-light" type="button" data-bs-toggle="dropdown" style={{fontFamily: 'StarJedi'}}>
								Favorites
							</button>
							<ul className="dropdown-menu dropdown-menu-dark">
								{/* Aqui va un .map para mostrar los favoritos guardados en el store */}
								{/* Aqui va la etiqueta Link para cada favorito que me lleve a su vista individual */}
								<li><a className="dropdown-item active" href="#">Action</a></li>
								<li><a className="dropdown-item" href="#">Another action</a></li>
								<li><a className="dropdown-item" href="#">Something else here</a></li>
								<li><hr className="dropdown-divider" style={{background: "white"}} /></li>
								<li>
									<a className="dropdown-item" href="#">
										<i class="fa-solid fa-trash text-danger"> eliminar</i>
									</a>
								</li>
							</ul>
						</div>
				</div>
			</div>
		</nav>
	);
};