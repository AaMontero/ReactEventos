import { useEffect, useState } from "react";
import './App.css';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import TablaEvento from './components/TablaEvento';
import ModalEvento from "./components/ModalEvento";
import { useDispatch } from "react-redux";
import { addUsuario } from "./redux/userSlice";
import { Header } from "./components/Header";

function App() {
  const data = {
    "nombre": "Anthonny",
    "correo": "aamonteroa@gmail.com"
  }
  const dispatch = useDispatch()
  useEffect(() =>{
    console.log(data); 
    (data) => dispatch(addUsuario(data)); 
  }, [])

  const [mostrarModal, setMostrarModal] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [editar, setEditar] = useState(null);
  const [numeroPagina, setNumeroPagina] = useState(1);
  const [tamanioPagina, setTamanioPagina] = useState(10);
  const [paginasTotales, setPaginasTotales] = useState(5);
  const API = process.env.REACT_APP_API_URL;

  const mostrarEventos = async (numeroPagina, tamanioPagina) => {
    const response = await fetch(`${API}evento/ListaP?numeroPagina=${numeroPagina}&tamanioPagina=${tamanioPagina}`);
    if (response.ok) {
      const data = await response.json();
      setEventos(data.data); 
      setPaginasTotales(data.paginasTotales);
    } else {
      console.log("No se pudieron mostrar los eventos");
    }
  };

  useEffect(() => {
    mostrarEventos(numeroPagina, tamanioPagina);
  }, [numeroPagina, tamanioPagina]);

  const handlePaginaSiguiente = () => {
    console.log("Paginas Totales = " + paginasTotales)
    if (numeroPagina < paginasTotales) {
      setNumeroPagina(numeroPagina + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (numeroPagina > 1) {
      setNumeroPagina(numeroPagina - 1);
    }
  };

  const guardarEvento = async (evento) => {
    const response = await fetch(API + "Evento/Guardar", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(evento)
    });

    if (response.ok) {
      setMostrarModal(false);
      mostrarEventos(numeroPagina, tamanioPagina);
    } else {
      console.log("Error al guardar el evento");
    }
  };

  const editarEvento = async (evento) => {
    const response = await fetch(API + "Evento/Editar", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(evento)
    });

    if (response.ok) {
      setMostrarModal(false);
      mostrarEventos(numeroPagina, tamanioPagina);
    } else {
      console.log("Error al editar el evento");
    }
  };

  const eliminarEvento = async (id) => {
    const respuesta = window.confirm("¿Desea eliminar el evento?");
    if (!respuesta) return;

    const response = await fetch(API + "Evento/Eliminar/" + id, {
      method: "DELETE"
    });

    if (response.ok) {
      mostrarEventos(numeroPagina, tamanioPagina);
    } else {
      console.log("Error al eliminar el evento");
    }
  };

  const eliminarEventoL = async (id) => {
    const respuesta = window.confirm("¿Desea eliminar el evento?");
    if (!respuesta) return;

    try {
      const response = await fetch(API + "Evento/EliminarL/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eliminado: true
        })
      });

      if (response.ok) {
        mostrarEventos(numeroPagina, tamanioPagina);
      } else {
        console.log("Error al eliminar el evento.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (

    <Container>
      <Header></Header>
      <Row className="mt-5">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Lista de Eventos</h5>
            </CardHeader>
            <CardBody>
              <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>
                Nuevo Evento
              </Button>
              <hr />
              <TablaEvento 
                data={eventos}
                setEditar={setEditar}
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                eliminarEvento={eliminarEventoL}
              />
              <div>
                <button onClick={handlePaginaAnterior} disabled={numeroPagina === 1}>Anterior</button>
                <button onClick={handlePaginaSiguiente} disabled={numeroPagina === paginasTotales}>Siguiente</button>
                <p>Página {numeroPagina} de {paginasTotales}</p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalEvento
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        guardarEvento={guardarEvento}
        editar={editar}
        setEditar={setEditar}
        editarEvento={editarEvento}
      />
    </Container>
  );
}

export default App;
