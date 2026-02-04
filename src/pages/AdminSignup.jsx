import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password should be at least 6 characters");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            alert("Admin Account Created! Please Login.");
            navigate('/admin');
        } catch (err) {
            setError(err.message.replace("Firebase: ", ""));
        }
    };

    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container" style={{ maxWidth: '400px' }}>
                <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '30px',
                    borderRadius: '15px',
                    border: '1px solid var(--bg-tertiary)',
                    textAlign: 'center'
                }}>
                    <UserPlus size={40} color="var(--primary)" style={{ marginBottom: '20px' }} />
                    <h2 style={{ marginBottom: '20px' }}>Setup Admin</h2>

                    {error && <p style={{ color: '#ff4d4d', marginBottom: '15px' }}>{error}</p>}

                    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Set Email"
                            className="form-control"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Set Password"
                            className="form-control"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="form-control"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                            Create Account
                        </button>
                    </form>
                    <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                        Already setup? <a href="/admin" style={{ color: 'var(--primary)' }}>Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;
