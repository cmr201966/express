import ArrowBack from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// services
import { create, edit } from "../../services/persons";

function Frm() {
  const { id, name, email, edad } = useParams();

  const navigate = useNavigate();

  const [tname, setTname] = useState("");
  const [temail, setTemail] = useState("");
  const [tedad, setTedad] = useState("");
  const [inicia, setInicia] = useState(true);

  async function init() {

    if (id === 'null') {
      setTname("");
      setTemail("");
      setTedad("");
    }
    if (id !== 'null') {
      setTname(name);
      setTemail(email);
      setTedad(edad);
    }
    setInicia(false);
  }

  async function confirmar() {
    try {
      if (id === 'null') {
        await create({ name: tname, email: temail, age: tedad });
        setTname("");
        setTemail("");
     }

     if (id !== 'null') {
         await edit( {id: id, name: tname, email: temail, age: tedad });
     }
     navigate(-1);

    } catch (e) {
      console.error(e);
    }
  }


  function handleInput(e) {
    switch (e.target.id) {
      case "name":
        setTname(e.target.value);
        break;
      case "email":
        setTemail(e.target.value);
        break;
      case "edad":
        setTedad(e.target.value);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <h1>Control de Recursos Humanos</h1>
      <IconButton
        color="primary"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBack />
      </IconButton>

          <div className="input-box">
            <label>Nombre:</label>
            <input
              className="input-area"
              id="name"
              value={tname}
              onChange={handleInput}
              type="text"
              required
            />
            <label>Email:</label>
            <input
              className="input-area"
              id="email"
              value={temail}
              onChange={handleInput}
              type="text"
              required
            />
            <label>Edad:</label>
            <input
              className="input-area"
              id="edad"
              value={tedad}
              onChange={handleInput}
              type="text"
              required
            />
          </div>

      <div className="app-grupo-button">
          <button type="button" className="primary" onClick={init}>
            <Close />
          </button>
          {inicia===false?
          ""
          :""}
{/*         {(name.length !== 0 && email.length !== 0) && edad.length!==0 ? */}
           <button type="button" className="primary" onClick={confirmar}>
             <Check />
           </button>
      </div>
    </>
  );
}

export default Frm;
