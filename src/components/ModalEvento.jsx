import { useEffect, useState } from "react";
import { Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Button, Label } from "reactstrap";

const modeloEvento = {
    idEvento: 0,
    fechaEvento: "",
    lugarEvento: "",
    descripcionEvento: "",
    precio: 0,
    eliminado: false,
}
const ModalEvento = ({ mostrarModal = false, setMostrarModal, guardarEvento, editar, setEditar, editarEvento }) => {

    const [evento, setEvento] = useState(modeloEvento);
    const actualizarDato = (e) => {
        setEvento(
            {
                ...evento,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (evento.idEvento == 0) {
            guardarEvento(evento)
        } else {
            editarEvento(evento)
        }
        setEvento(modeloEvento)
    }
    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }
    useEffect(() => {
        if (editar != null) {
            setEvento(editar)
        } else {
            setEvento(modeloEvento)
        }
    }, [editar]) // Bloque de codigo que se ejecuta cuando cambia el estado de editar 

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {evento.id == 0 ? "Nuevo Evento" : "Editar Evento"}

            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Fecha del Evento</Label>
                        <Input
                            type="date"
                            name="fechaEvento"
                            onChange={(e) => actualizarDato(e)}
                            value={evento.fechaEvento ? evento.fechaEvento.toString().slice(0, 10) : ''}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Lugar del Evento</Label>
                        <Input name="lugarEvento" onChange={(e) => actualizarDato(e)} value={evento.lugarEvento} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripcion del Evento</Label>
                        <Input name="descripcionEvento" onChange={(e) => actualizarDato(e)} value={evento.descripcionEvento} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Precio del Evento</Label>
                        <Input type="number" name="precio" onChange={(e) => actualizarDato(e)} value={evento.precio} />
                    </FormGroup>

                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal} >Cerrar</Button>
            </ModalFooter>
        </Modal>

    )

}
export default ModalEvento; 