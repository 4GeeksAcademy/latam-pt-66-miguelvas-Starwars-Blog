export const Card = () => {
    return (  
        <div className="card me-5 shadow-sm" style={{ width: "18rem", flexShrink: 0 }}>
            <img src="https://loremflickr.com/300/200" className="card-img-top img-fluid" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5> {/*Esto es una prop*/}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">An item</li> {/*Esto es una prop*/}
                <li className="list-group-item">A second item</li> {/*Esto es una prop*/}
                <li className="list-group-item">A third item</li> {/*Esto es una prop*/}
            </ul>
            <div className="card-body d-flex justify-content-between align-items-center">
                <button className="btn btn-primary">Learn more</button> {/*Este boton tiene un Onclick que lleva a otra vista*/}
                <button className="btn btn-outline-warning"> {/*Este boton tiene un Onclick que me altera el useState*/}
                    <i className="fa-solid fa-star"></i>
                </button>
            </div>
        </div>
    );
}