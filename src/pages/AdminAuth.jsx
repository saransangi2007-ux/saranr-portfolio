import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError("Invalid Credentials or User Not Found");
            console.error(err);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)'
        }}>
            <div style={{
                background: 'var(--bg-secondary)',
                padding: '40px',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '400px',
                border: '1px solid var(--bg-tertiary)',
                boxShadow: '0 0 50px rgba(0,0,0,0.5)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary)' }}>
                    <Lock size={40} />
                    <h2 style={{ color: 'var(--text-primary)', marginTop: '10px' }}>Admin Login</h2>
                </div>

                {error && <p style={{ color: '#ff4d4d', marginBottom: '20px', textAlign: 'center' }}>{error}</p>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            style={{ width: '100%' }}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            style={{ width: '100%' }}
                            required
                        />
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Login
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <Link to="/admin/signup" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Reset/New Admin?</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminAuth;
