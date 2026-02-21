import { useState } from 'react';
import Layout from '../components/Layout';
import { useHospital, type Patient } from '../context/HospitalContext';
import Input from '../components/Input';
import Modal from '../components/Modal';
import PatientForm from '../components/PatientForm';
import { Plus, Search, Edit2, Trash2, Users, Calendar, Clock, Phone, User } from 'lucide-react';

const Patients = () => {
    const { patients, addPatient, updatePatient, deletePatient, resolvedTheme, colors } = useHospital();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState<Patient | undefined>(undefined);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.contact.includes(searchTerm)
    );

    const handleAddPatient = (data: Omit<Patient, 'id'>) => {
        addPatient(data);
        setIsModalOpen(false);
    };

    const handleUpdatePatient = (data: Omit<Patient, 'id'>) => {
        if (editingPatient) {
            updatePatient(editingPatient.id, data);
            setEditingPatient(undefined);
            setIsModalOpen(false);
        }
    };

    const openAddModal = () => {
        setEditingPatient(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (patient: Patient) => {
        setEditingPatient(patient);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            deletePatient(id);
        }
    };

    // Get avatar color based on name
    const getAvatarColor = (name: string): string => {
        const colors = [
            'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
            'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
            'linear-gradient(135deg, #059669 0%, #34d399 100%)',
            'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
            'linear-gradient(135deg, #dc2626 0%, #f87171 100%)',
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <Layout>
            {/* Page Header */}
            <div style={{
                background: 'linear-gradient(135deg, #0d1628 0%, #0f2044 45%, #0c253d 100%)',
                borderRadius: '20px',
                padding: '32px',
                marginBottom: '24px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(37,99,235,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}>
                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                }} />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Users size={28} color="white" />
                        </div>
                        <div>
                            <h1 style={{
                                color: 'white',
                                fontSize: '28px',
                                fontWeight: 700,
                                margin: 0,
                            }}>
                                Patient Management
                            </h1>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '14px',
                                margin: '6px 0 0',
                            }}>
                                Manage patient records, history, and visits
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={openAddModal}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            background: colors.surface,
                            color: '#9333ea',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            boxShadow: colors.shadow,
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = resolvedTheme === 'dark' ? '0 10px 25px rgba(0, 0, 0, 0.4)' : '0 10px 25px rgba(147, 51, 234, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = colors.shadow;
                        }}
                    >
                        <Plus size={18} /> Add Patient
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '24px',
            }}>
                {[
                    { label: 'Total Patients', value: patients.length, icon: Users, color: '#9333ea' },
                    { label: 'New This Month', value: 12, icon: User, color: '#2563eb' },
                    { label: 'Appointments Today', value: 8, icon: Calendar, color: '#059669' },
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} style={{
                            background: colors.surface,
                            borderRadius: '16px',
                            padding: '20px',
                            border: `1px solid ${colors.border}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: `${stat.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Icon size={22} color={stat.color} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>{stat.label}</p>
                                <p style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 700, color: colors.textPrimary }}>
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Search Card */}
            <div style={{
                background: colors.surface,
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
                border: `1px solid ${colors.border}`,
            }}>
                <div style={{ maxWidth: '400px' }}>
                    <Input
                        leftIcon={Search}
                        placeholder="Search by name or contact..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            {/* Patient Cards / Table */}
            <div style={{
                background: colors.surface,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: colors.shadow,
                border: `1px solid ${colors.border}`,
            }}>
                {/* Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 0.5fr 0.5fr 1fr 1fr 1fr 0.8fr',
                    gap: '16px',
                    padding: '16px 24px',
                    background: resolvedTheme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
                    borderBottom: `1px solid ${colors.border}`,
                }}>
                    {['Patient', 'Age', 'Gender', 'Contact', 'History', 'Last Visit', 'Actions'].map((header) => (
                        <span key={header} style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: colors.textSecondary,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}>
                            {header}
                        </span>
                    ))}
                </div>

                {/* Table Body */}
                {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                        <div
                            key={patient.id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 0.5fr 0.5fr 1fr 1fr 1fr 0.8fr',
                                gap: '16px',
                                padding: '16px 24px',
                                borderBottom: `1px solid ${colors.border}`,
                                background: hoveredRow === patient.id ? colors.surfaceHover : 'transparent',
                                alignItems: 'center',
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={() => setHoveredRow(patient.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            {/* Patient Name with Avatar */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: getAvatarColor(patient.name),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                }}>
                                    {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </div>
                                <span style={{ fontWeight: 600, color: colors.textPrimary }}>{patient.name}</span>
                            </div>

                            {/* Age */}
                            <span style={{ color: colors.textSecondary }}>{patient.age}</span>

                            {/* Gender */}
                            <span style={{
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontSize: '12px',
                                fontWeight: 500,
                                background: patient.gender === 'Male' ? '#dbeafe' : '#fce7f3',
                                color: patient.gender === 'Male' ? '#1d4ed8' : '#be185d',
                            }}>
                                {patient.gender}
                            </span>

                            {/* Contact */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.textSecondary }}>
                                <Phone size={14} />
                                <span style={{ fontSize: '13px' }}>{patient.contact}</span>
                            </div>

                            {/* History */}
                            <span style={{ color: colors.textSecondary, fontSize: '13px' }}>{patient.history || 'N/A'}</span>

                            {/* Last Visit */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.textSecondary }}>
                                <Clock size={14} />
                                <span style={{ fontSize: '13px' }}>{patient.lastVisit || 'N/A'}</span>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); openEditModal(patient); }}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: '#dbeafe',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Edit2 size={16} color="#2563eb" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(patient.id); }}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: '#fee2e2',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Trash2 size={16} color="#dc2626" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{
                        padding: '48px',
                        textAlign: 'center',
                        color: colors.textSecondary,
                    }}>
                        <Users size={48} color={resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'} style={{ marginBottom: '12px' }} />
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>No patients found</p>
                        <p style={{ margin: '8px 0 0', fontSize: '13px' }}>Try a different search term or add a new patient</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
                subtitle={editingPatient ? 'Update patient information' : 'Enter patient details below'}
            >
                <PatientForm
                    initialData={editingPatient}
                    onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </Layout>
    );
};

export default Patients;
