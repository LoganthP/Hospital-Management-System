import { useState } from 'react';
import Layout from '../components/Layout';
import { useHospital, type Doctor } from '../context/HospitalContext';
import Input from '../components/Input';
import Select from '../components/Select';
import Modal from '../components/Modal';
import DoctorForm from '../components/DoctorForm';
import { Plus, Search, Edit2, Trash2, Stethoscope, Star, Phone, Mail } from 'lucide-react';

const Doctors = () => {
    const { doctors, addDoctor, updateDoctor, deleteDoctor, resolvedTheme, colors } = useHospital();
    const [searchTerm, setSearchTerm] = useState('');
    const [specializationFilter, setSpecializationFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | undefined>(undefined);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpec = specializationFilter ? doctor.specialization === specializationFilter : true;
        return matchesSearch && matchesSpec;
    });

    const handleAddDoctor = (data: Omit<Doctor, 'id'>) => {
        addDoctor(data);
        setIsModalOpen(false);
    };

    const handleUpdateDoctor = (data: Omit<Doctor, 'id'>) => {
        if (editingDoctor) {
            updateDoctor(editingDoctor.id, data);
            setIsModalOpen(false);
            setEditingDoctor(undefined);
        }
    };

    const openAddModal = () => {
        setEditingDoctor(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (doctor: Doctor) => {
        setEditingDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to remove this doctor?')) {
            deleteDoctor(id);
        }
    };

    // Get specialty color
    const getSpecialtyColor = (specialty: string): { bg: string; color: string; gradient: string } => {
        const colors: Record<string, { bg: string; color: string; gradient: string }> = {
            'Cardiology': { bg: '#fee2e2', color: '#dc2626', gradient: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)' },
            'Neurology': { bg: '#f3e8ff', color: '#9333ea', gradient: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)' },
            'Pediatrics': { bg: '#fef3c7', color: '#d97706', gradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)' },
            'Dermatology': { bg: '#fce7f3', color: '#be185d', gradient: 'linear-gradient(135deg, #be185d 0%, #f472b6 100%)' },
            'Orthopedics': { bg: '#dbeafe', color: '#2563eb', gradient: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)' },
        };
        return colors[specialty] || { bg: '#e5e7eb', color: '#6b7280', gradient: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' };
    };

    // Get availability styles
    const getAvailabilityStyle = (availability: string): { bg: string; color: string; dot: string } => {
        const styles: Record<string, { bg: string; color: string; dot: string }> = {
            Available: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
            Busy: { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
            'Off-Duty': { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' },
        };
        return styles[availability] || styles['Off Duty'];
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
                            <Stethoscope size={28} color="white" />
                        </div>
                        <div>
                            <h1 style={{
                                color: 'white',
                                fontSize: '28px',
                                fontWeight: 700,
                                margin: 0,
                            }}>
                                Doctor Directory
                            </h1>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '14px',
                                margin: '6px 0 0',
                            }}>
                                Manage hospital staff and specialists
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
                            background: 'white',
                            color: '#059669',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                        }}
                    >
                        <Plus size={18} /> Add Doctor
                    </button>
                </div>
            </div>

            {/* Search & Filter Card */}
            <div style={{
                background: colors.surface,
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
                border: `1px solid ${colors.border}`,
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
            }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                    <Input
                        leftIcon={Search}
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                    />
                </div>
                <div style={{ width: '200px' }}>
                    <Select
                        options={[
                            { value: '', label: 'All Specializations' },
                            { value: 'Cardiology', label: 'Cardiology' },
                            { value: 'Neurology', label: 'Neurology' },
                            { value: 'Pediatrics', label: 'Pediatrics' },
                            { value: 'Dermatology', label: 'Dermatology' },
                            { value: 'Orthopedics', label: 'Orthopedics' },
                        ]}
                        value={specializationFilter}
                        onChange={(e) => setSpecializationFilter(e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            {/* Stats Row */}
            <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px',
                flexWrap: 'wrap',
            }}>
                <div style={{
                    padding: '12px 20px',
                    background: resolvedTheme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: resolvedTheme === 'dark' ? '#4ade80' : '#15803d' }}>
                        {doctors.filter(d => d.availability === 'Available').length} Available
                    </span>
                </div>
                <div style={{
                    padding: '12px 20px',
                    background: resolvedTheme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: resolvedTheme === 'dark' ? '#fbbf24' : '#b45309' }}>
                        {doctors.filter(d => d.availability === 'Busy').length} Busy
                    </span>
                </div>
                <div style={{
                    padding: '12px 20px',
                    background: resolvedTheme === 'dark' ? 'rgba(156, 163, 175, 0.2)' : '#f3f4f6',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9ca3af' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: resolvedTheme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                        {doctors.filter(d => d.availability === 'Off-Duty').length} Off-Duty
                    </span>
                </div>
            </div>

            {/* Doctor Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
            }}>
                {filteredDoctors.map((doctor) => {
                    const specialtyStyle = getSpecialtyColor(doctor.specialization);
                    const availStyle = getAvailabilityStyle(doctor.availability);
                    const isHovered = hoveredCard === doctor.id;

                    return (
                        <div
                            key={doctor.id}
                            style={{
                                background: colors.surface,
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: isHovered
                                    ? (resolvedTheme === 'dark' ? '0 20px 40px -12px rgba(0, 0, 0, 0.5)' : '0 20px 40px -12px rgba(0, 0, 0, 0.15)')
                                    : colors.shadow,
                                border: `1px solid ${colors.border}`,
                                transition: 'all 0.3s',
                                transform: isHovered ? 'translateY(-4px)' : 'none',
                            }}
                            onMouseEnter={() => setHoveredCard(doctor.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Card Header with Specialty Color */}
                            <div style={{
                                background: specialtyStyle.gradient,
                                padding: '24px',
                                position: 'relative',
                            }}>
                                {/* Status Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 12px',
                                    borderRadius: '9999px',
                                    background: 'rgba(255, 255, 255, 0.9)',
                                }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: availStyle.dot,
                                    }} />
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: availStyle.color }}>
                                        {doctor.availability}
                                    </span>
                                </div>

                                {/* Avatar */}
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.3)',
                                    border: '3px solid rgba(255, 255, 255, 0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 700,
                                }}>
                                    {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div style={{ padding: '20px 24px' }}>
                                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>
                                    {doctor.name}
                                </h3>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    background: specialtyStyle.bg,
                                    color: specialtyStyle.color,
                                    fontSize: '12px',
                                    fontWeight: 600,
                                }}>
                                    {doctor.specialization}
                                </span>

                                {/* Contact Info */}
                                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textSecondary }}>
                                        <Phone size={14} />
                                        <span style={{ fontSize: '13px' }}>{doctor.contact}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textSecondary }}>
                                        <Mail size={14} />
                                        <span style={{ fontSize: '13px' }}>
                                            {doctor.name.toLowerCase().replace(' ', '.')}@medicare.com
                                        </span>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div style={{
                                    marginTop: '16px',
                                    paddingTop: '16px',
                                    borderTop: `1px solid ${colors.border}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={16}
                                                fill={star <= 4 ? '#fbbf24' : 'none'}
                                                color={star <= 4 ? '#fbbf24' : (resolvedTheme === 'dark' ? '#374151' : '#e5e7eb')}
                                            />
                                        ))}
                                        <span style={{ marginLeft: '6px', fontSize: '13px', color: colors.textSecondary }}>4.0</span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => openEditModal(doctor)}
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
                                            }}
                                        >
                                            <Edit2 size={14} color="#2563eb" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doctor.id)}
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
                                            }}
                                        >
                                            <Trash2 size={14} color="#dc2626" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filteredDoctors.length === 0 && (
                    <div style={{
                        gridColumn: '1 / -1',
                        padding: '48px',
                        textAlign: 'center',
                        background: colors.surface,
                        borderRadius: '20px',
                        border: `1px solid ${colors.border}`,
                    }}>
                        <Stethoscope size={48} color={resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'} style={{ marginBottom: '12px' }} />
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 500, color: colors.textSecondary }}>
                            No doctors found
                        </p>
                        <p style={{ margin: '8px 0 0', fontSize: '13px', color: colors.textSecondary }}>
                            Try a different search term or add a new doctor
                        </p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
                subtitle={editingDoctor ? 'Update doctor information' : 'Enter doctor details below'}
            >
                <DoctorForm
                    initialData={editingDoctor}
                    onSubmit={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </Layout>
    );
};

export default Doctors;
