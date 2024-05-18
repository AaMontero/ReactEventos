import { Button, Table } from "reactstrap";

const TablaEvento = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarEvento }) => {
  const enviarDatos = (evento) => {
    setEditar(evento);
    setMostrarModal(!mostrarModal);
  };

  const convertirFecha = (fechaNF) => {
    const fecha = new Date(fechaNF);
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);
    const fechaFormateada = `${year}-${month}-${day}`;
    return fechaFormateada;
  };

  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>Fecha del Evento</th>
          <th>Lugar del Evento</th>
          <th>Descripcion del Evento</th>
          <th>Precio del Evento</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          data.length < 1 ? (
            <tr>
              <td colSpan="5">Sin registros</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{convertirFecha(item.fechaEvento)}</td>
                <td>{item.lugarEvento}</td>
                <td>{item.descripcionEvento}</td>
                <td>$ {item.precio}</td>
                <td>
                  <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>Editar</Button>
                  <Button color="danger" size="sm" onClick={() => eliminarEvento(item.id)}>Eliminar</Button>
                </td>
              </tr>
            ))
          )
        }
      </tbody>
    </Table>
  );
};

export default TablaEvento;
