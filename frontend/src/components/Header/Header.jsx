import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Link className="navbar-brand" to="/">
                            React Crud
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <NavLink
                                    className="text-black text-decoration-none ms-4"
                                    to="/"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    className="text-black text-decoration-none ms-4"
                                    to="/todos"
                                >
                                    Todos
                                </NavLink>
                                <NavLink
                                    className="text-black text-decoration-none ms-4"
                                    to="/add-todo"
                                >
                                    Add Todo
                                </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;
