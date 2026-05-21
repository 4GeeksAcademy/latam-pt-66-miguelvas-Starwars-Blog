import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPerson, getPlanet, getVehicle } from "../services/results.service";

export const Single = () => {
  const { type, uid } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let data = null;
      try {
        if (type === "people") {
          data = await getPerson(uid);
        } else if (type === "planets") {
          data = await getPlanet(uid);
        } else if (type === "vehicles") {
          data = await getVehicle(uid);
        }
      } catch (err) {
        console.error("error fetching item", err);
      }
      setItem(data);
      setLoading(false);
    };
    fetchData();
  }, [type, uid]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!item) return <div className="container text-center mt-5"><h1>Not found! (type: {type}, id: {uid})</h1></div>;

  const commonKeys = [];
  if (type === "people") {
    commonKeys.push('height','mass','hair_color','skin_color','birth_year','gender');
  } else if (type === "planets") {
    commonKeys.push('climate','terrain','population','gravity','orbital_period');
  } else if (type === "vehicles") {
    commonKeys.push('model','vehicle_class','manufacturer','length','cost_in_credits');
  }

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">{item.name}</h1>
      <hr className="my-4" />
      <div className="row">
        <div className="col-md-6">
          <img src="https://loremflickr.com/400/300" alt={item.name} className="img-fluid" />
        </div>
        <div className="col-md-6 mt-4 mt-lg-0 text-start">
          {commonKeys.map((key) =>
            item[key] !== undefined && (
              <p key={key}>
                <strong className="text-warning">{key.replace(/_/g, ' ')}:</strong> {item[key]}
              </p>
            )
          )}
        </div>
      </div>
      <hr className="my-4" />
      <Link to="/">
        <span className="btn btn-warning btn-lg" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};