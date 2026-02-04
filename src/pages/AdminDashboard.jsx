import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut, Upload, Save } from 'lucide-react';
import {
    getProjects,
    saveProject,
    deleteProject,
    getSkills,
    saveSkill,
    deleteSkill,
    uploadResume
} from '../services/data';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [activeTab, setActiveTab] = useState('projects');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/admin');
            } else {
                fetchData();
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        const [p, s] = await Promise.all([getProjects(), getSkills()]);
        setProjects(p);
        setSkills(s);
        setLoading(false);
    };

    const handleLogout = () => {
        signOut(auth).then(() => navigate('/'));
    };

    // --- Projects Logic ---
    const handleAddProject = async () => {
        const newProject = {
            title: "New Project",
            description: "Description...",
            tech: ["React"],
            link: "#",
            github: "#"
        };
        await saveProject(newProject);
        fetchData(); // Refresh
    };

    const handleUpdateProject = async (id, field, value) => {
        // Optimistic update for UI smoothness
        setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleSaveProject = async (project) => {
        setLoading(true);
        await saveProject(project);
        setLoading(false);
        alert("Project Saved!");
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm("Are you sure?")) {
            await deleteProject(id);
            fetchData();
        }
    };

    // --- Skills Logic ---
    const handleAddSkill = async () => {
        await saveSkill({ name: "New Skill", level: 50 });
        fetchData();
    };

    const handleUpdateSkill = (id, field, value) => {
        setSkills(skills.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleSaveSkill = async (skill) => {
        setLoading(true);
        await saveSkill(skill);
        setLoading(false);
    };

    const handleDeleteSkill = async (id) => {
        await deleteSkill(id);
        fetchData();
    };

    // --- Resume Logic ---
    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                await uploadResume(file);
                alert("Resume uploaded to cloud storage successfully!");
            } catch (e) {
                console.error(e);
                alert("Error uploading resume: " + e.message);
            }
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '100px 20px 20px 20px' }}>
            <div className="container">
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '40px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--bg-tertiary)'
                }}>
                    <h2>Admin <span className="gradient-text">Dashboard</span></h2>
                    <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '8px 16px' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </header>

                {loading && <p style={{ textAlign: 'center', color: 'var(--primary)' }}>Loading data from cloud...</p>}

                <div style={{ marginBottom: '30px', display: 'flex', gap: '20px' }}>
                    <button
                        className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        Projects
                    </button>
                    <button
                        className={`btn ${activeTab === 'skills' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('skills')}
                    >
                        Skills
                    </button>
                    <button
                        className={`btn ${activeTab === 'resume' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('resume')}
                    >
                        Resume
                    </button>
                </div>

                {activeTab === 'projects' && (
                    <div>
                        <button onClick={handleAddProject} className="btn btn-primary" style={{ marginBottom: '20px' }}>
                            <Plus size={18} /> Add Project
                        </button>

                        <div style={{ display: 'grid', gap: '20px' }}>
                            {projects.map(p => (
                                <div key={p.id} style={{
                                    background: 'var(--bg-secondary)',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--bg-tertiary)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <input
                                            value={p.title}
                                            onChange={(e) => handleUpdateProject(p.id, 'title', e.target.value)}
                                            style={{ background: 'transparent', border: '1px solid var(--bg-tertiary)', color: 'white', padding: '5px', fontSize: '1.2rem', width: '70%' }}
                                        />
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button onClick={() => handleSaveProject(p)} style={{ color: 'var(--primary)' }}>
                                                <Save size={20} />
                                            </button>
                                            <button onClick={() => handleDeleteProject(p.id)} style={{ color: '#ff4d4d' }}>
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <textarea
                                        value={p.description}
                                        onChange={(e) => handleUpdateProject(p.id, 'description', e.target.value)}
                                        style={{ background: 'var(--bg-primary)', border: 'none', color: '#aaa', width: '100%', padding: '10px', minHeight: '60px', borderRadius: '5px', marginBottom: '10px' }}
                                    />

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        <input
                                            value={p.link}
                                            onChange={(e) => handleUpdateProject(p.id, 'link', e.target.value)}
                                            placeholder="Demo Link"
                                            className="form-control"
                                        />
                                        <input
                                            value={p.github}
                                            onChange={(e) => handleUpdateProject(p.id, 'github', e.target.value)}
                                            placeholder="GitHub Link"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div style={{ maxWidth: '600px' }}>
                        <button onClick={handleAddSkill} className="btn btn-primary" style={{ marginBottom: '20px' }}>
                            <Plus size={18} /> Add Skill
                        </button>

                        {skills.map((s) => (
                            <div key={s.id} style={{
                                display: 'flex',
                                gap: '20px',
                                marginBottom: '15px',
                                background: 'var(--bg-secondary)',
                                padding: '15px',
                                borderRadius: '8px',
                                alignItems: 'center'
                            }}>
                                <input
                                    value={s.name}
                                    onChange={(e) => handleUpdateSkill(s.id, 'name', e.target.value)}
                                    className="form-control"
                                    style={{ flex: 1, marginBottom: 0 }}
                                />
                                <input
                                    type="number"
                                    value={s.level}
                                    onChange={(e) => handleUpdateSkill(s.id, 'level', parseInt(e.target.value))}
                                    className="form-control"
                                    style={{ width: '80px', marginBottom: 0 }}
                                />
                                <button onClick={() => handleSaveSkill(s)} style={{ color: 'var(--primary)' }}>
                                    <Save size={18} />
                                </button>
                                <button onClick={() => handleDeleteSkill(s.id)} style={{ color: '#ff4d4d' }}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'resume' && (
                    <div style={{ maxWidth: '600px', background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
                        <Upload size={50} color="var(--primary)" style={{ marginBottom: '20px' }} />
                        <h3>Upload Resume (PDF)</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Select a PDF file to upload to Firebase Cloud Storage.</p>

                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleResumeUpload}
                            style={{ display: 'block', margin: '0 auto' }}
                        />

                        <p style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            File: resume/Saran_Ravichandran_Resume.pdf
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
