import React, { useState } from 'react'
import './Navbar.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const RestaurantNavbar = () => {
    const [expanded, setExpanded] = useState(false);
    const [activeNav, setActiveNav] = useState('HOME');

    const handleNavItemClick = (itemName) => {
        setExpanded(false);
        setActiveNav(itemName);
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
                            <NavLink 
                                to={'/'} 
                                onClick={() => handleNavItemClick('HOME')}
                                className={activeNav === 'HOME' ? 'active-nav-link' : 'nav-link'}
                            >
                                HOME
                            </NavLink>
                            <Nav.Link 
                                onClick={() => handleNavItemClick('MENU')}
                                className={activeNav === 'MENU' ? 'active-nav-link' : 'nav-link'}
                            >
                                MENU
                            </Nav.Link>
                            <Nav.Link 
                                onClick={() => handleNavItemClick('RESERVATION')}
                                className={activeNav === 'RESERVATION' ? 'active-nav-link' : 'nav-link'}
                            >
                                MAKE A RESERVATION
                            </Nav.Link>
                            <Nav.Link 
                                onClick={() => handleNavItemClick('CONTACT')}
                                className={activeNav === 'CONTACT' ? 'active-nav-link' : 'nav-link'}
                            >
                                CONTACT US
                            </Nav.Link>
                            <NavLink 
                                to={'/admin'} 
                                onClick={() => handleNavItemClick('ADMIN')}
                                className={activeNav === 'ADMIN' ? 'active-nav-link' : 'nav-link'}
                            >
                                ADMIN
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default RestaurantNavbar;