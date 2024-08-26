import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../services/persons";

import "./App.css";

function App() {
  const [lista, setLista] = useState([]);

  async function init() {
    try {
      let result = await fetch("http://localhost:8080/persons", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      result = await result.json();
      setLista(result.rows);
    } catch (err) {
      console.error(err);
    }
  }

  async function remove(id) {
    try {
      let borrar=await makeRequest({ id: id }, "DELETE");
      await borrar.json();
    } catch (e) {
      console.error(e);
    }
    const result = await fetch("http://localhost:8080/persons");
    const data = await result.json();
    setLista(data.rows);

  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <h3>Control de Recursos Humanos</h3>
      <div className="encabezado">
        <p>Id</p>
        <p>Nombre</p>
        <p>Email</p>
        <p>Edad</p>
      </div>
      {lista.map((item) => {
        return (
          <>
            <div className="fila-borrar">
              <div key={item.id} className="encabezado">
                <label>{item.id}</label>
                <label>{item.name}</label>
                <label>{item.email}</label>
                <label>{item.age}</label>
              </div>
              <div className="modifica-elimina">
              <Link to={`/${item.id}/${item.name.replace("%20"," ")}/${item.email}/${item.age}/frm`}>
                <span className="link-image-span">{"Modificar"}</span>
              </Link>
              <button className="borrar" onClick={() => remove(item.id)}>
                Eliminar
              </button>
              </div>
            </div>
          </>
        );
      })}
      <div className="agregar">
           <Link to={`/null/""/""/""/frm`}>
              <span className="link-image-span">{"Agregar"}</span>
           </Link>
      </div>

    </>
  );
}

export default App;
