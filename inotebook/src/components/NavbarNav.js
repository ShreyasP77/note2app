import React from 'react'
import { Offcanvas, Container, Button } from 'react-bootstrap';
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";
const NavbarNav = () => {
    const [show, setShow] = useState(false);
    let navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname)
    }, [location]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div>
            <div className="container-fluid py-3 navbar navbar-expand-lg navbar-light bg-light">
                <ul className="nav navbar-nav float-center">

                    <Link className="nav-link nav-item active text-primary" aria-current="page" to="/">

                        SP-Drive
                    </Link>

                    {/* <form className="d-flex">
                            <input className="form-control me-2 border border-white rounded-3" type="search" placeholder="Search"
                             aria-label="Search" style={{width: "42rem", backgroundColor:"rgb(245, 245, 245)", height: "3rem" }} />

                            </form> */}
                    <Link className={`nav-link text-center nav-item px-auto tabs ${location.pathname === '/home' ? "active" : ""}`} aria-current="page" to="/home" style={{ paddingLeft: "0.30rem", paddingBottom: "1rem" }}>

                        Home
                    </Link>
                    <Link className={`nav-link text-center nav-item px-auto tabs ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to="/about" style={{ paddingLeft: "0.30rem", paddingBottom: "1rem" }}>

                        About
                    </Link>
                    {localStorage.getItem('token') ?


                        <Button variant="primary" className={`nav-link text-center mx-2 logout nav-item px-auto btn btn-sm text-light btn-primary tabs`} onClick={handleLogout}>
                            Logout
                        </Button> :
                        <div> <Link className={`nav-link text-center mx-2 login nav-item px-auto btn btn-sm text-light btn-primary tabs ${location.pathname === '/login' ? "active" : ""}`} role="button" aria-current="page" to="/login" style={{ paddingLeft: "0.30rem", paddingBottom: "0.3rem" }}>
                            Login
                        </Link>
                            <Link className={`nav-link text-center signUp mx-2 text-light btn btn-sm btn-primary nav-item px-auto tabs ${location.pathname === '/signup' ? "active" : ""}`} role="button" aria-current="page" to="/signUp" style={{ paddingLeft: "0.30rem", paddingBottom: "1rem" }}>
                                Signup
                            </Link>
                        </div>
                    }
                    <li className="nav-item" id="hamburger">



                        <Button variant="light" onClick={handleShow}>
                            &#9776;
                        </Button>

                        <Offcanvas backdrop={true} scroll={true} show={show} onHide={handleClose} style={{ width: "200px" }}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                Some text as placeholder. In real life you can have the elements you
                                have chosen. Like, text, images, lists, etc.
                            </Offcanvas.Body>
                        </Offcanvas>



                    </li>

                </ul>



                <hr style={{ marginTop: "1px" }} />


            </div>


        </div>
    )
}

export default NavbarNav
