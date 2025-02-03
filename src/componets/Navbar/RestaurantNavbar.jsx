import React, { useState } from 'react'
import './Navbar.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const RestaurantNavbar = () => {
    const [expanded, setExpanded] = useState(false);

    const handleNavItemClick = () => {
        // Close the navbar on mobile when an item is clicked
        setExpanded(false);
    };

    return (
        <div>
            <Navbar
                expanded={expanded}
                onToggle={(isExpanded) => setExpanded(isExpanded)}
                expand="lg"
                bg='dark'
                className="bg-body-tertiary navbar"
            >
                <Container className="position-relative">
                    <Navbar.Brand href="#home" className='logo-cont'>
                        <img src="/images/dnslogo1.png" alt="" className='dnslogo' />
                        <div className="logo-title">
                            <h1>DEEP <span>NET</span></h1>
                            <h1>SOFT</h1>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="ms-auto navbar-dark"
                        onClick={() => setExpanded(!expanded)}
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to={'/'} onClick={handleNavItemClick}>
                                <Nav.Link as="div">HOME</Nav.Link>
                            </Link>
                            <Nav.Link as="div" onClick={handleNavItemClick}>
                                MENU
                            </Nav.Link>
                            <Nav.Link as="div" onClick={handleNavItemClick}>
                                MAKE A RESERVATION
                            </Nav.Link>
                            <Nav.Link as="div" onClick={handleNavItemClick}>
                                CONTACT US
                            </Nav.Link>
                            <Link to={'/admin'} onClick={handleNavItemClick}>
                                <Nav.Link as="div">ADMIN</Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default RestaurantNavbar;