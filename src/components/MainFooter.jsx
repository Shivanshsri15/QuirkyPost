import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


const Footer = () => {
    return (
        <footer className="itim-regular py-4"> 
            <Container>
                <Row>
                    <Col md={4} className='mr-2'>
                        <strong>

                        <h5>About Us</h5>
                        </strong>
                        <p style={{ fontSize: "10px" }}>Welcome to QuirkyPost, the vibrant blogging platform designed for creative minds and unique voices! Whether you're a seasoned writer, a passionate storyteller, or someone who simply loves to share their thoughts, QuirkyPost provides you with all the tools you need to express yourself and connect with a like-minded community.</p>
                        <p>Email: Srivastavashivansh295@gmail.com</p>
                        <p>+123456789</p>
                    </Col>
                    <Col md={4} className='ps-5'>
                        <h5>Links</h5>
                        <Navbar className='' >
                            <Navbar.Brand href="#home" style={{fontSize:"15px"}}>Home</Navbar.Brand>
                            <Navbar.Brand href="#services" style={{fontSize:"15px"}}>Blog</Navbar.Brand>
                            <Navbar.Brand href="#contact" style={{fontSize:"15px"}}>Contact</Navbar.Brand>
                        </Navbar>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <div>
                            <a href="https://facebook.com" className="text-secondary me-2"><FaFacebook /></a>
                            <a href="https://twitter.com" className="text-secondary me-2"><FaTwitter /></a>
                            <a href="https://instagram.com" className="text-secondary"><FaInstagram /></a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-start">
                        <p>&copy; {new Date().getFullYear()} QuirkyPost. All rights reserved.</p>
                    </Col>
                    <Col className='w-50 text-end' style={{fontSize:"12px"}}>
                        
                        <span className='m-4 textHover'>Terms and services</span>
                        <span className='m-4 textHover'>Privacy Policy</span>
                        <span className='m-4 textHover'>Cookie Policy</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;