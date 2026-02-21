import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Room, RoomStatus } from '../services/wardData';
import { MOCK_ROOMS } from '../services/wardData';

// Types
export interface Patient {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    contact: string;
    history: string;
    lastVisit: string;
}

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    contact: string;
    availability: 'Available' | 'Busy' | 'Off-Duty';
}

export interface Appointment {
    id: string;
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    notes?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Doctor' | 'Nurse' | 'Patient';
    avatar?: string;
}

export interface HistoryEntry {
    id: string;
    user: string;
    role: string;
    date: string;
    time: string;
    status: 'Active' | 'Logged Out';
}

interface HospitalContextType {
    patients: Patient[];
    doctors: Doctor[];
    appointments: Appointment[];
    currentUser: User | null;
    addPatient: (patient: Omit<Patient, 'id'>) => void;
    updatePatient: (id: string, patient: Partial<Patient>) => void;
    deletePatient: (id: string) => void;
    addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
    updateDoctor: (id: string, doctor: Partial<Doctor>) => void;
    deleteDoctor: (id: string) => void;
    addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
    updateAppointment: (id: string, status: Appointment['status']) => void;
    cancelAppointment: (id: string) => void;
    login: (user: User) => void;
    logout: () => void;
    loginHistory: HistoryEntry[];
    theme: 'light' | 'dark' | 'system';
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    colors: any;
    rooms: Room[];
    updateRoomStatus: (id: string, status: RoomStatus) => void;
    assignPatientToRoom: (id: string, patientName: string | null) => void;
    assignDoctorToRoom: (id: string, doctorName: string | null) => void;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const useHospital = () => {
    const context = useContext(HospitalContext);
    if (!context) {
        throw new Error('useHospital must be used within a HospitalProvider');
    }
    return context;
};

// Mock Data
const MOCK_PATIENTS: Patient[] = [
    { id: '1', name: 'John Doe', age: 45, gender: 'Male', contact: '555-0101', history: 'Hypertension', lastVisit: '2023-10-15' },
    { id: '2', name: 'Jane Smith', age: 32, gender: 'Female', contact: '555-0102', history: 'Asthma', lastVisit: '2023-11-20' },
    { id: '3', name: 'Robert Johnson', age: 58, gender: 'Male', contact: '555-0103', history: 'Diabetes', lastVisit: '2023-12-05' },
    { id: '4', name: 'Emily Davis', age: 28, gender: 'Female', contact: '555-0104', history: 'None', lastVisit: '2024-01-10' },
    { id: '5', name: 'Michael Wilson', age: 35, gender: 'Male', contact: '555-0105', history: 'Back Pain', lastVisit: '2024-02-01' },
];

const MOCK_DOCTORS: Doctor[] = [
    { id: '1', name: 'Dr. Sarah Smith', specialization: 'Cardiology', contact: '555-0201', availability: 'Available' },
    { id: '2', name: 'Dr. James Brown', specialization: 'Pediatrics', contact: '555-0202', availability: 'Busy' },
    { id: '3', name: 'Dr. Emily White', specialization: 'Dermatology', contact: '555-0203', availability: 'Off-Duty' },
    { id: '4', name: 'Dr. Michael Green', specialization: 'Neurology', contact: '555-0204', availability: 'Available' },
];

const MOCK_APPOINTMENTS: Appointment[] = [
    { id: '1', patientId: '1', doctorId: '1', date: '2024-02-15', time: '09:00', status: 'Scheduled', notes: 'Regular checkup' },
    { id: '2', patientId: '2', doctorId: '2', date: '2024-02-15', time: '10:30', status: 'Scheduled', notes: 'Child vaccination' },
    { id: '3', patientId: '3', doctorId: '1', date: '2024-02-14', time: '14:00', status: 'Completed', notes: 'Follow-up' },
    { id: '4', patientId: '5', doctorId: '4', date: '2024-02-16', time: '11:00', status: 'Scheduled', notes: 'Headache consultation' },
];

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize from localStorage or use mock data
    const [patients, setPatients] = useState<Patient[]>(() => {
        const saved = localStorage.getItem('patients');
        return saved ? JSON.parse(saved) : MOCK_PATIENTS;
    });

    const [doctors, setDoctors] = useState<Doctor[]>(() => {
        const saved = localStorage.getItem('doctors');
        return saved ? JSON.parse(saved) : MOCK_DOCTORS;
    });

    const [appointments, setAppointments] = useState<Appointment[]>(() => {
        const saved = localStorage.getItem('appointments');
        return saved ? JSON.parse(saved) : MOCK_APPOINTMENTS;
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('patients', JSON.stringify(patients));
    }, [patients]);

    useEffect(() => {
        localStorage.setItem('doctors', JSON.stringify(doctors));
    }, [doctors]);

    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    // Actions
    const addPatient = (patient: Omit<Patient, 'id'>) => {
        const newPatient = { ...patient, id: Date.now().toString() };
        setPatients(prev => [...prev, newPatient]);
    };

    const updatePatient = (id: string, updatedPatient: Partial<Patient>) => {
        setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updatedPatient } : p));
    };

    const deletePatient = (id: string) => {
        setPatients(prev => prev.filter(p => p.id !== id));
    };

    const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
        const newDoctor = { ...doctor, id: Date.now().toString() };
        setDoctors(prev => [...prev, newDoctor]);
    };

    const updateDoctor = (id: string, updatedDoctor: Partial<Doctor>) => {
        setDoctors(prev => prev.map(d => d.id === id ? { ...d, ...updatedDoctor } : d));
    };

    const deleteDoctor = (id: string) => {
        setDoctors(prev => prev.filter(d => d.id !== id));
    };

    const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
        const newAppointment = { ...appointment, id: Date.now().toString() };
        setAppointments(prev => [...prev, newAppointment]);
    };

    const updateAppointment = (id: string, status: Appointment['status']) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    };

    const cancelAppointment = (id: string) => {
        updateAppointment(id, 'Cancelled');
    };

    // Auth State
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [loginHistory, setLoginHistory] = useState<HistoryEntry[]>(() => {
        const saved = localStorage.getItem('loginHistory');
        return saved ? JSON.parse(saved) : [
            { id: 'h1', user: 'Dr. Sarah Smith', role: 'Admin', date: 'Oct 24, 2023', time: '08:30 AM', status: 'Active' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
    }, [loginHistory]);

    const login = (user: User) => {
        setCurrentUser(user);
        const now = new Date();
        const newEntry: HistoryEntry = {
            id: Date.now().toString(),
            user: user.name,
            role: user.role,
            date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            status: 'Active'
        };
        setLoginHistory(prev => [newEntry, ...prev].slice(0, 50)); // Keep last 50
    };

    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            if (currentUser) {
                // Update specific status to logged out if we want, or just leave it
                setLoginHistory(prev => prev.map(h => (h.user === currentUser.name && h.status === 'Active') ? { ...h, status: 'Logged Out' as const } : h));
            }
            setCurrentUser(null);
            // In a real app, you might redirect here
            window.location.href = '/';
        }
    };

    const [rooms, setRooms] = useState<Room[]>(() => {
        const saved = localStorage.getItem('rooms');
        return saved ? JSON.parse(saved) : MOCK_ROOMS;
    });

    useEffect(() => {
        localStorage.setItem('rooms', JSON.stringify(rooms));
    }, [rooms]);

    const updateRoomStatus = (id: string, status: RoomStatus) => {
        setRooms(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    const assignPatientToRoom = (id: string, patientName: string | null) => {
        setRooms(prev => prev.map(r => r.id === id ? {
            ...r,
            currentPatient: patientName || undefined,
            status: patientName ? 'Occupied' : 'Available',
            occupiedBeds: patientName ? (r.occupiedBeds || 1) : 0
        } : r));
    };

    const assignDoctorToRoom = (id: string, doctorName: string | null) => {
        setRooms(prev => prev.map(r => r.id === id ? { ...r, assignedDoctor: doctorName || undefined } : r));
    };

    // Theme State
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
    });

    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const resolvedTheme = theme === 'system' ? systemTheme : theme;

    const colors = resolvedTheme === 'dark' ? {
        background: '#111827',
        surface: '#1f2937',
        surfaceHover: '#374151',
        border: '#374151',
        textPrimary: '#f9fafb',
        textSecondary: '#9ca3af',
        textMuted: '#6b7280',
        inputBg: '#111827',
        iconColor: '#9ca3af',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        dropdownShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
    } : {
        background: '#f3f4f6',
        surface: '#ffffff',
        surfaceHover: '#f9fafb',
        border: '#e5e7eb',
        textPrimary: '#111827',
        textSecondary: '#4b5563',
        textMuted: '#9ca3af',
        inputBg: '#f3f4f6',
        iconColor: '#6b7280',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        dropdownShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    };

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (targetTheme: 'light' | 'dark') => {
            if (targetTheme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        // System theme listener
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            setSystemTheme(newSystemTheme);
        };

        mediaQuery.addEventListener('change', handleChange);

        // Initial application
        applyTheme(resolvedTheme);

        localStorage.setItem('theme', theme);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, resolvedTheme]);

    return (
        <HospitalContext.Provider value={{
            patients,
            doctors,
            appointments,
            currentUser,
            theme,
            resolvedTheme,
            addPatient,
            updatePatient,
            deletePatient,
            addDoctor,
            updateDoctor,
            deleteDoctor,
            addAppointment,
            updateAppointment,
            cancelAppointment,
            login,
            logout,
            loginHistory,
            setTheme,
            colors,
            rooms,
            updateRoomStatus,
            assignPatientToRoom,
            assignDoctorToRoom
        }}>
            {children}
        </HospitalContext.Provider>
    );
};
