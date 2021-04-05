import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand className="logo text-light" href="/home">Ki Lagbe?</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav className="">
                        <Link className="menu text-light m-2" to="/manageProducts">Manage Product</Link>
                        <Link className="menu text-light m-2" to="/addProducts">Add Product</Link>
                        <Link className="menu text-light m-2" to="#">Edit Product</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default AdminHeader;