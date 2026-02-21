import { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Calendar, Clock, ArrowRight, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecentAppointments = () => {
    const { appointments, patients, doctors, resolvedTheme, colors } = useHospital();
    const navigate = useNavigate();
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    const recentAppointments = appointments
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
        .map(app => {
            const patient = patients.find(p => p.id === app.patientId);
            const doctor = doctors.find(d => d.id === app.doctorId);
            return {
                ...app,
                patientName: patient?.name || 'Unknown',
                doctorName: doctor?.name || 'Unknown',
            };
        });

    // Get status badge styles
    const getStatusStyle = (status: string): React.CSSProperties => {
        const styles: Record<string, React.CSSProperties> = {
            Scheduled: {
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                color: '#1d4ed8',
                border: '1px solid #93c5fd',
            },
            Completed: {
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                color: '#15803d',
                border: '1px solid #86efac',
            },
            Cancelled: {
                background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                color: '#b91c1c',
                border: '1px solid #fca5a5',
            },
        };
        return styles[status] || styles.Scheduled;
    };

    return (
        <div style={{
            background: colors.surface,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: colors.shadow,
            border: `1px solid ${colors.border}`,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Header */}
            <div style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Calendar size={20} color="white" />
                    </div>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '16px', fontWeight: 700 }}>
                        Recent Appointments
                    </h3>
                </div>
                <span style={{
                    padding: '4px 12px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'white',
                }}>
                    {recentAppointments.length} latest
                </span>
            </div>

            {/* Appointments List */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {recentAppointments.map((app) => (
                    <div
                        key={app.id}
                        style={{
                            padding: '16px 24px',
                            borderBottom: `1px solid ${colors.border}`,
                            background: hoveredRow === app.id ? colors.surfaceHover : 'transparent',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={() => setHoveredRow(app.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        onClick={() => navigate('/appointments')}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '12px',
                        }}>
                            {/* Patient Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                }}>
                                    {app.patientName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </div>
                                <div>
                                    <p style={{
                                        margin: 0,
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: colors.textPrimary,
                                    }}>
                                        {app.patientName}
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        marginTop: '2px',
                                    }}>
                                        <Stethoscope size={12} color={colors.textMuted} />
                                        <span style={{ fontSize: '12px', color: colors.textSecondary }}>
                                            {app.doctorName}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <span style={{
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontSize: '11px',
                                fontWeight: 600,
                                ...getStatusStyle(app.status),
                            }}>
                                {app.status}
                            </span>
                        </div>

                        {/* Date/Time */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={14} color={colors.textMuted} />
                                <span style={{ fontSize: '12px', color: colors.textSecondary }}>{app.date}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Clock size={14} color={colors.textMuted} />
                                <span style={{ fontSize: '12px', color: colors.textSecondary }}>{app.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{
                padding: '16px 24px',
                borderTop: `1px solid ${colors.border}`,
                background: resolvedTheme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
            }}>
                <button
                    onClick={() => navigate('/appointments')}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '10px',
                        background: colors.surface,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '10px',
                        color: '#9333ea',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = colors.surface;
                        e.currentTarget.style.color = '#9333ea';
                        e.currentTarget.style.borderColor = colors.border;
                    }}
                >
                    View All Appointments
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default RecentAppointments;
