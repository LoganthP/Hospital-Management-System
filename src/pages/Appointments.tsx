import { useState } from 'react';
import Layout from '../components/Layout';
import { useHospital, type Appointment } from '../context/HospitalContext';
import Input from '../components/Input';
import Modal from '../components/Modal';
import AppointmentForm from '../components/AppointmentForm';
import { Plus, Search, Edit2, XCircle, Calendar, Clock, Stethoscope, CalendarDays, CheckCircle, AlertCircle } from 'lucide-react';

const Appointments = () => {
    const { appointments, patients, doctors, addAppointment, cancelAppointment, resolvedTheme, colors } = useHospital();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | undefined>(undefined);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('All');

    // Enrich appointments with patient and doctor names
    const enrichedAppointments = appointments.map(app => {
        const patient = patients.find(p => p.id === app.patientId);
        const doctor = doctors.find(d => d.id === app.doctorId);
        return {
            ...app,
            patientName: patient?.name || 'Unknown',
            doctorName: doctor?.name || 'Unknown',
            specialization: doctor?.specialization || 'Unknown'
        };
    });

    const filteredAppointments = enrichedAppointments.filter(app => {
        const matchesSearch =
            app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddAppointment = (data: Omit<Appointment, 'id'>) => {
        addAppointment(data);
        setIsModalOpen(false);
    };

    const handleUpdateAppointment = (_data: Omit<Appointment, 'id'>) => {
        if (editingAppointment) {
            setIsModalOpen(false);
            setEditingAppointment(undefined);
        }
    };

    const openAddModal = () => {
        setEditingAppointment(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (appointment: Appointment) => {
        setEditingAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleCancel = (id: string) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            cancelAppointment(id);
        }
    };

    // Get status styles
    const getStatusStyle = (status: string): { bg: string; color: string; icon: typeof CheckCircle } => {
        const styles: Record<string, { bg: string; color: string; icon: typeof CheckCircle }> = {
            Scheduled: {
                bg: resolvedTheme === 'dark' ? 'rgba(37, 99, 235, 0.2)' : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                color: resolvedTheme === 'dark' ? '#60a5fa' : '#1d4ed8',
                icon: Clock
            },
            Completed: {
                bg: resolvedTheme === 'dark' ? 'rgba(22, 163, 74, 0.2)' : 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                color: resolvedTheme === 'dark' ? '#4ade80' : '#15803d',
                icon: CheckCircle
            },
            Cancelled: {
                bg: resolvedTheme === 'dark' ? 'rgba(220, 38, 38, 0.2)' : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                color: resolvedTheme === 'dark' ? '#f87171' : '#dc2626',
                icon: XCircle
            },
        };
        return styles[status] || styles.Scheduled;
    };

    // Get avatar color
    const getAvatarColor = (name: string): string => {
        const colors = [
            'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
            'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
            'linear-gradient(135deg, #059669 0%, #34d399 100%)',
            'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    // Stats
    const stats = [
        { label: 'Scheduled', value: appointments.filter(a => a.status === 'Scheduled').length, color: '#2563eb', icon: Clock },
        { label: 'Completed', value: appointments.filter(a => a.status === 'Completed').length, color: '#15803d', icon: CheckCircle },
        { label: 'Cancelled', value: appointments.filter(a => a.status === 'Cancelled').length, color: '#dc2626', icon: AlertCircle },
    ];

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
                            <CalendarDays size={28} color="white" />
                        </div>
                        <div>
                            <h1 style={{
                                color: 'white',
                                fontSize: '28px',
                                fontWeight: 700,
                                margin: 0,
                            }}>
                                Appointments
                            </h1>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '14px',
                                margin: '6px 0 0',
                            }}>
                                Schedule and manage patient visits
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
                            color: '#2563eb',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            boxShadow: colors.shadow,
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = resolvedTheme === 'dark' ? '0 10px 25px rgba(0, 0, 0, 0.4)' : '0 10px 25px rgba(37, 99, 235, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = colors.shadow;
                        }}
                    >
                        <Plus size={18} /> Book Appointment
                    </button>
                </div>
            </div>

            {/* Search Section */}
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
                        placeholder="Search by patient or doctor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            {/* Stats Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                marginBottom: '24px',
            }}>
                {stats.map((stat, index) => {
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
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: statusFilter === stat.label ? `0 0 0 2px ${stat.color}` : colors.shadow,
                        }}
                            onClick={() => setStatusFilter(statusFilter === stat.label ? 'All' : stat.label)}
                        >
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

            {/* Appointments Table */}
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
                    gridTemplateColumns: '1.8fr 1.5fr 0.8fr 0.6fr 1fr 0.8fr',
                    gap: '16px',
                    padding: '16px 24px',
                    background: resolvedTheme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
                    borderBottom: `1px solid ${colors.border}`,
                }}>
                    {['Patient', 'Doctor', 'Date', 'Time', 'Status', 'Actions'].map((header) => (
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
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((app) => {
                        const statusStyle = getStatusStyle(app.status);
                        const StatusIcon = statusStyle.icon;

                        return (
                            <div
                                key={app.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1.8fr 1.5fr 0.8fr 0.6fr 1fr 0.8fr',
                                    gap: '16px',
                                    padding: '16px 24px',
                                    borderBottom: `1px solid ${colors.border}`,
                                    background: hoveredRow === app.id ? colors.surfaceHover : 'transparent',
                                    alignItems: 'center',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={() => setHoveredRow(app.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                {/* Patient */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: getAvatarColor(app.patientName),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                    }}>
                                        {app.patientName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 600, color: colors.textPrimary, fontSize: '14px' }}>
                                            {app.patientName}
                                        </span>
                                    </div>
                                </div>

                                {/* Doctor */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Stethoscope size={16} color={colors.textMuted} />
                                    <div>
                                        <span style={{ color: colors.textSecondary, fontSize: '14px' }}>{app.doctorName}</span>
                                        <span style={{
                                            display: 'block',
                                            fontSize: '11px',
                                            color: colors.textMuted,
                                        }}>
                                            {app.specialization}
                                        </span>
                                    </div>
                                </div>

                                {/* Date */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.textSecondary }}>
                                    <Calendar size={14} />
                                    <span style={{ fontSize: '13px' }}>{app.date}</span>
                                </div>

                                {/* Time */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.textSecondary }}>
                                    <Clock size={14} />
                                    <span style={{ fontSize: '13px' }}>{app.time}</span>
                                </div>

                                {/* Status */}
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 12px',
                                    borderRadius: '9999px',
                                    background: statusStyle.bg,
                                    width: 'fit-content',
                                }}>
                                    <StatusIcon size={14} color={statusStyle.color} />
                                    <span style={{
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: statusStyle.color,
                                    }}>
                                        {app.status}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); openEditModal(app); }}
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
                                    {app.status === 'Scheduled' && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleCancel(app.id); }}
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
                                            <XCircle size={14} color="#dc2626" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{
                        padding: '48px',
                        textAlign: 'center',
                        color: colors.textSecondary,
                    }}>
                        <CalendarDays size={48} color={resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'} style={{ marginBottom: '12px' }} />
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>No appointments found</p>
                        <p style={{ margin: '8px 0 0', fontSize: '13px' }}>
                            {statusFilter !== 'All'
                                ? `No ${statusFilter.toLowerCase()} appointments`
                                : 'Try a different search term or book a new appointment'}
                        </p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingAppointment ? 'Edit Appointment' : 'Book Appointment'}
                subtitle={editingAppointment ? 'Update appointment details' : 'Schedule a new patient visit'}
            >
                <AppointmentForm
                    initialData={editingAppointment}
                    onSubmit={editingAppointment ? handleUpdateAppointment : handleAddAppointment}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </Layout>
    );
};

export default Appointments;
