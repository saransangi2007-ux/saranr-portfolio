import { ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer style={{
            padding: '30px 0',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--bg-tertiary)',
            marginTop: 'auto'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <p style={{ color: 'var(--text-secondary)' }}>
                    © 2026 Saran Ravichandran. All rights reserved.
                </p>

                <button
                    onClick={scrollToTop}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s'
                    }}
                    aria-label="Back to top"
                >
                    <ArrowUp size={20} />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
