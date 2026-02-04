import { motion } from 'framer-motion';
import { getSkills } from '../services/data';
import { useState, useEffect } from 'react';
import './About.css';

const About = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getSkills();
            // Sort skills if needed, e.g., by level
            data.sort((a, b) => b.level - a.level);
            setSkills(data);
        };
        fetch();
    }, []);

    return (
        <section className="section about" id="about">
            <div className="container about-content">
                <div className="about-visual" data-aos="fade-right">
                    <div className="about-img-placeholder" style={{
                        width: '100%',
                        minHeight: '400px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem'
                    }}>
                        🎓
                    </div>
                    {/* Add real image later */}
                </div>

                <div className="about-text" data-aos="fade-left">
                    <h2>About <span className="gradient-text">Me</span></h2>
                    <div style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
                        <p style={{ marginBottom: '15px' }}>
                            Hi, I’m <strong>Saran R</strong>, a passionate B.Tech student specializing in <strong>Artificial Intelligence & Machine Learning</strong>, with strong hands-on experience in Python, SQL, and Full-Stack Web Development.
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            I enjoy building real-world, problem-solving applications that combine AI concepts, database design, and modern web technologies. I have worked on projects like Gym Management Systems, Smart Automation solutions, and AI-based applications, focusing on clean architecture, proper DBMS principles, and user-friendly design.
                        </p>

                        <p style={{ marginBottom: '10px', fontWeight: 'bold', color: 'var(--primary)' }}>I am particularly interested in:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
                            <li>AI & Machine Learning</li>
                            <li>Backend development with databases (Oracle SQL, MySQL)</li>
                            <li>Full-stack web applications</li>
                            <li>Automation & smart systems</li>
                            <li>Music + AI (AI music tools & creative tech)</li>
                        </ul>

                        <p>
                            I’m a quick learner, self-motivated, and project-driven, always eager to learn new technologies and apply them to practical use cases. My goal is to contribute to impactful tech products and grow as a software engineer / AI engineer in a top technology company.
                        </p>
                    </div>

                    <div className="education-card">
                        <h3>B.Tech Artifical Intelligence & Data Science</h3>
                        <p>Panimalar Engineering College | 2022 - 2026</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Focusing on Deep Learning, Computer Vision, and Natural Language Processing.
                        </p>
                    </div>

                    <div className="skills-container">
                        <h3>Tech Stack</h3>
                        {skills.length === 0 && <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Skills loading or not added...</p>}
                        {skills.map((skill) => (
                            <div className="skill-item" key={skill.id || skill.name}>
                                <div className="skill-info">
                                    <span>{skill.name}</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <motion.div
                                        className="progress-bar-fill"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="fun-fact">
                        <strong>Fun Fact:</strong> I spend my weekends training models on my local GPU and debugging tensor shapes!
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
