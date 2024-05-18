import { useSelector } from "react-redux";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";

export const Header = () => {
    const user = useSelector((state) => state.user);

    return (
        <Navbar color="light" light expand="md">
            <Nav className="mr-auto" navbar>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-link" style={{ fontWeight: 'bold' }}>¡Bienvenido {user.nombre} !</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" style={{ fontWeight: 'bold' }}>Correo: {user.email}</span>
                    </li>
                </ul>
            </Nav>
            <Nav navbar>
                <NavItem>
                    <NavLink href="/">Regresar</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};
