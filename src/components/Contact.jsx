import { useState } from 'react';
import { Mail, Phone, Send, Github, Linkedin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:saransangi2007@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <section className="section contact-section" id="contact">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2>Get In <span className="gradient-text">Touch</span></h2>
                    <p>Have a project in mind or want to discuss AI? Let's chat.</p>
                </div>

                <div className="contact-content" data-aos="fade-up">
                    <div className="contact-info">
                        <h3>Let's Connect</h3>
                        <p>I'm currently looking for internships and opportunities in AI/ML.</p>

                        <div className="contact-details">
                            <a href="mailto:saransangi2007@gmail.com" className="contact-item">
                                <div className="icon-box"><Mail size={24} /></div>
                                <div>
                                    <p className="label">Email</p>
                                    <p className="value">saransangi2007@gmail.com</p>
                                </div>
                            </a>

                            <a href="tel:+917395905538" className="contact-item">
                                <div className="icon-box"><Phone size={24} /></div>
                                <div>
                                    <p className="label">Phone</p>
                                    <p className="value">+91 7395905538</p>
                                </div>
                            </a>

                            <div className="social-links" style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                                <a href="https://github.com" target="_blank" rel="noreferrer" className="icon-box" style={{ width: '40px', height: '40px' }}>
                                    <Github size={20} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="icon-box" style={{ width: '40px', height: '40px' }}>
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="john@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-control"
                                placeholder="Tell me about your project..."
                                required
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
