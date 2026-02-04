import { useState, useEffect } from 'react';
import { ArrowDown, Eye, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getResumeUrl } from '../services/data';
import './Hero.css';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = "B.Tech AIML Student | Aspiring AI Engineer";
    const navigate = useNavigate();

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;
            if (index > fullText.length) {
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const handleResumeView = async () => {
        const url = await getResumeUrl();
        if (url) {
            window.open(url, '_blank');
        } else {
            alert("Resume not uploaded yet!");
        }
    };

    return (
        <section className="hero" id="home">
            <div className="hero-content" data-aos="fade-up">
                <div className="profile-container">
                    <div className="profile-img-placeholder" style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        border: '4px solid var(--bg-secondary)',
                        boxShadow: '0 0 30px var(--primary-glow)'
                    }}>
                        <span style={{ fontSize: '3rem' }}>👨‍💻</span>
                    </div>
                </div>

                <h1 className="hero-name">
                    Saran <span className="gradient-text">Ravichandran</span>
                </h1>

                <div className="hero-tagline">
                    {text}<span className="cursor">|</span>
                </div>

                <p className="hero-bio">
                    Passionate about building intelligent systems. Exploring ML models, computer vision, and NLP.
                </p>

                <div className="hero-cta">
                    <button onClick={() => navigate('/projects')} className="btn btn-primary">
                        View Projects <ArrowDown size={18} />
                    </button>

                    <button onClick={handleResumeView} className="btn btn-outline">
                        View Resume <Eye size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
