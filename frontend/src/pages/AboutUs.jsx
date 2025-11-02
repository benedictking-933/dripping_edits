import React from 'react';
import BenedictImg from '../assets/benedict.jpg';
import JosiahImg from '../assets/josiah.jpg';
import JuthelImg from '../assets/juthel.jpg';
import HeroImg from '../assets/hero-banner.jpg'; // Static hero banner

const AboutUsPage = () => {
    return (
        <div className="container-fluid p-0 bg-light">

            {/* 1. Hero/Banner Section */}
            <div 
                className="text-white text-center shadow-sm hero-section d-flex align-items-center justify-content-center" 
                style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,0.5)), url(${HeroImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '60vh',
                    height: 'auto',
                    padding: '80px 20px',
                }}
            >
                <div className="container">
                    <h1 className="fw-bolder mb-3 display-4">Powering the Digital Future</h1>
                    <p className="lead mb-3">
                        Bridging technology and innovation to make electronics accessible for everyone.
                    </p>
                    <a href="/shop" className="btn btn-primary btn-lg mt-3 fw-bold">Explore Products</a>
                </div>
            </div>

            <div className="container">

                {/* 2. Our Story / Mission */}
                <div className="card shadow-lg p-4 p-md-5 mb-5" style={{ borderRadius: '1rem' }}>
                    <div className="card-body">
                        <div className="row align-items-center flex-column flex-md-row">
                            <div className="col-md-6 mb-4 mb-md-0 text-center text-md-start">
                                <h3 className="fw-bold text-primary mb-3">Our Mission: Innovation for Everyone</h3>
                                <p className="text-secondary">
                                    Our company was founded with the vision to make high-quality electronics accessible to all. 
                                    From smart devices to professional computing gear, we carefully select and test every product to ensure reliability and performance.
                                </p>
                                <p className="text-secondary">
                                    With a focus on fast delivery, expert support, and user satisfaction, we aim to empower individuals and businesses to thrive in the digital era.
                                </p>
                                <p className="text-secondary">
                                    Sustainability, innovation, and community engagement are at the heart of everything we do.
                                </p>
                            </div>
                            <div className="col-md-6 text-center">
                                <div className="p-5 border rounded-3 bg-light text-primary">
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>&#9889; Trusted Quality & Service</span>
                                </div>
                            </div>
                        </div>

                        <hr className="my-5" />

                        {/* 3. Meet the Team */}
                        <h3 className="fw-bold text-center mb-5 text-dark">Meet Our Leadership Team</h3>
                        <div className="row text-center">

                            <div className="col-md-4 mb-4">
                                <img 
                                    src={BenedictImg} 
                                    alt="Benedict Portrait" 
                                    className="rounded-circle mb-3 shadow" 
                                    style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                                />
                                <h5 className="fw-bold text-dark">Benedict A.</h5>
                                <p className="text-primary small fw-bold">Chief Executive Officer (CEO)</p>
                                <p className="small text-muted mb-0">
                                    Visionary leader driving the company's mission, strategy, and innovation.
                                </p>
                            </div>

                            <div className="col-md-4 mb-4">
                                <img 
                                    src={JosiahImg} 
                                    alt="Josiah Portrait" 
                                    className="rounded-circle mb-3 shadow" 
                                    style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                                />
                                <h5 className="fw-bold text-dark">Josiah K.</h5>
                                <p className="text-primary small fw-bold">Chief Technology Officer (CTO)</p>
                                <p className="small text-muted mb-0">
                                    Oversees product curation, technology platforms, and ensures seamless user experiences.
                                </p>
                            </div>

                            <div className="col-md-4 mb-4">
                                <img 
                                    src={JuthelImg} 
                                    alt="Juthel Portrait" 
                                    className="rounded-circle mb-3 shadow" 
                                    style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                                />
                                <h5 className="fw-bold text-dark">Juthel P.</h5>
                                <p className="text-primary small fw-bold">Head of Customer Relations</p>
                                <p className="small text-muted mb-0">
                                    Ensures exceptional support, builds trust, and maintains strong customer relationships.
                                </p>
                            </div>

                        </div>

                        <hr className="my-5" />

                        {/* 4. Values / Why Choose Us */}
                        <div className="row text-center mb-5">
                            <div className="col-md-4 mb-4">
                                <div className="p-4 border rounded-3 bg-light">
                                    <h5 className="fw-bold text-primary">Quality Products</h5>
                                    <p className="small text-muted mb-0">
                                        Only the best electronics curated and tested for reliability.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="p-4 border rounded-3 bg-light">
                                    <h5 className="fw-bold text-primary">Fast Delivery</h5>
                                    <p className="small text-muted mb-0">
                                        Quick shipping to ensure you get your products when you need them.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="p-4 border rounded-3 bg-light">
                                    <h5 className="fw-bold text-primary">Customer Support</h5>
                                    <p className="small text-muted mb-0">
                                        Dedicated support team available to help with any inquiry or issue.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 5. Call to Action */}
                        <div className="text-center p-4 border rounded-3 bg-light">
                            <h4 className="fw-bold mb-3">Questions? Let's Connect!</h4>
                            <p className="text-secondary">
                                Whether you're looking for a specific gadget or just want to say hello, we're here to help.
                            </p>
                            <a href="/shop" className="btn btn-primary btn-lg mt-2 fw-bold me-3" style={{ height: '52px' }}>
                                Explore Products
                            </a>
                            <a href="#" className="btn btn-outline-primary btn-lg mt-2 fw-bold" style={{ height: '52px' }}>
                                Contact Us
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
