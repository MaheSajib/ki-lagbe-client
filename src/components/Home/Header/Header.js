import React from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand className="logo" href="/home">Ki Lagbe?</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav className="">
                        <Link className="menu text-dark m-2" to="/home">Home</Link>
                        <Link className="menu text-dark m-2" to="/order">Orders</Link>
                        <Link className="menu text-dark m-2" to="/admin">Admin</Link>
                        <Link className="menu text-dark m-2" to="#link">Deals</Link>
                    </Nav>
                    <Form inline>
                        <Button variant="btn btn-success">Login</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;