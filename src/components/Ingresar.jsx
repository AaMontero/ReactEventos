import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import App from "../App.jsx"
import { addUsuario } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
export const Ingresar = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleIngresar = () => {
        dispatch(addUsuario({ nombre: username, email: email }));
        navigate("/app")
    };
    const deslogear = () => {
        dispatch(addUsuario({nombre: "", email: ""}))
        navigate("/")
    }
    return (
        <div className="ingresar-container">
            <h2 >Login</h2>
            <Form>
                <FormGroup>
                    <Label className="fw-bold fst-italic" for="username">Usuario:</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="fw-bold fst-italic" for="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <Button color="primary" type="button" onClick={handleIngresar}>
                    Ingresar
                </Button>
            </Form>
        </div>
    );
};
