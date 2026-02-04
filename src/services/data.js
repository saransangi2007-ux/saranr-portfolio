import { db, storage } from '../firebase';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    getAll
} from 'firebase/storage';

// --- Skills ---
export const getSkills = async () => {
    const querySnapshot = await getDocs(collection(db, "skills"));
    const skills = [];
    querySnapshot.forEach((doc) => {
        skills.push({ id: doc.id, ...doc.data() });
    });
    // Sort by created time or just default order
    // If no skills in DB, return default only if needed (handling empty state in UI is better)
    return skills.length > 0 ? skills : [];
};

export const saveSkill = async (skill) => {
    // Add new skill
    if (!skill.id) {
        await addDoc(collection(db, "skills"), skill);
    } else {
        // Update existing
        const skillRef = doc(db, "skills", skill.id);
        await updateDoc(skillRef, skill);
    }
};

export const deleteSkill = async (id) => {
    await deleteDoc(doc(db, "skills", id));
};


// --- Projects ---
export const getProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects = [];
    querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
};

export const saveProject = async (project) => {
    if (!project.id) {
        // Creating new can be tricky with Image upload happening separately
        // Generally we pass the object without ID for ADD
        await addDoc(collection(db, "projects"), project);
    } else {
        const projectRef = doc(db, "projects", project.id);
        await updateDoc(projectRef, project);
    }
};

export const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
};


// --- Resume ---
export const uploadResume = async (file) => {
    const storageRef = ref(storage, 'resume/Saran_Ravichandran_Resume.pdf');
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

export const getResumeUrl = async () => {
    try {
        const storageRef = ref(storage, 'resume/Saran_Ravichandran_Resume.pdf');
        return await getDownloadURL(storageRef);
    } catch (e) {
        console.error("No resume found", e);
        return null;
    }
};
