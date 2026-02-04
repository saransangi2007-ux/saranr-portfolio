import { useState, useEffect } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { getProjects } from '../services/data';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const data = await getProjects();
            setProjects(data);
            setLoading(false);
        };
        fetch();
    }, []);

    return (
        <section className="section projects" id="projects">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2>Featured <span className="gradient-text">Projects</span></h2>
                    <p>A selection of my work in AI, ML, and Web Development.</p>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading projects...</p>
                ) : (
                    <div className="projects-grid">
                        {projects.length === 0 && <p style={{ textAlign: 'center', gridColumn: '1/-1', color: 'var(--text-secondary)' }}>No projects added yet.</p>}
                        {projects.map((project, index) => (
                            <div
                                className="project-card"
                                key={project.id}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="project-img-wrapper">
                                    {/* Image placeholder */}
                                    <div className="project-img-placeholder">
                                        <Folder size={40} color="var(--primary)" />
                                    </div>
                                </div>

                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.description}</p>

                                    <div className="project-tech">
                                        {project.tech && project.tech.map(t => (
                                            <span className="tech-badge" key={t}>{t}</span>
                                        ))}
                                    </div>

                                    <div className="project-links">
                                        <a href={project.link} className="link-btn" target="_blank" rel="noopener noreferrer">
                                            <ExternalLink size={16} /> Live Demo
                                        </a>
                                        <a href={project.github} className="link-btn" target="_blank" rel="noopener noreferrer">
                                            <Github size={16} /> Code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
