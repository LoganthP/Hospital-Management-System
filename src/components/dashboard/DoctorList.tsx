import { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowRight, Phone, Mail } from 'lucide-react';

const DoctorList = () => {
    const { doctors, resolvedTheme, colors } = useHospital();
    const navigate = useNavigate();
    const [hoveredDoctor, setHoveredDoctor] = useState<string | null>(null);

    // Get availability styles
    const getAvailabilityStyle = (availability: string): { bg: string; color: string; dot: string } => {
        const styles: Record<string, { bg: string; color: string; dot: string }> = {
            Available: {
                bg: resolvedTheme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7',
                color: resolvedTheme === 'dark' ? '#4ade80' : '#15803d',
                dot: '#22c55e'
            },
            Busy: {
                bg: resolvedTheme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
                color: resolvedTheme === 'dark' ? '#fbbf24' : '#b45309',
                dot: '#f59e0b'
            },
            'Off Duty': {
                bg: resolvedTheme === 'dark' ? 'rgba(156, 163, 175, 0.2)' : '#f3f4f6',
                color: resolvedTheme === 'dark' ? '#d1d5db' : '#6b7280',
                dot: '#9ca3af'
            },
        };
        return styles[availability] || styles['Off Duty'];
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
                background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
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
                        <Stethoscope size={20} color="white" />
                    </div>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '16px', fontWeight: 700 }}>
                        Doctors Availability
                    </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#22c55e',
                        animation: 'pulse 2s infinite',
                    }} />
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                        {doctors.filter(d => d.availability === 'Available').length} online
                    </span>
                </div>
            </div>

            {/* Doctors List */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {doctors.slice(0, 5).map(doc => {
                    const availStyle = getAvailabilityStyle(doc.availability);
                    const isHovered = hoveredDoctor === doc.id;

                    return (
                        <div
                            key={doc.id}
                            style={{
                                padding: '16px 24px',
                                borderBottom: `1px solid ${colors.border}`,
                                background: isHovered ? colors.surfaceHover : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={() => setHoveredDoctor(doc.id)}
                            onMouseLeave={() => setHoveredDoctor(null)}
                            onClick={() => navigate('/doctors')}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                {/* Doctor Info */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {/* Avatar with status dot */}
                                    <div style={{ position: 'relative' }}>
                                        <div style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '12px',
                                            background: `linear-gradient(135deg, ${doc.availability === 'Available' ? '#059669' : doc.availability === 'Busy' ? '#d97706' : '#6b7280'} 0%, ${doc.availability === 'Available' ? '#34d399' : doc.availability === 'Busy' ? '#fbbf24' : '#9ca3af'} 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: 700,
                                            fontSize: '14px',
                                        }}>
                                            {doc.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                        </div>
                                        {/* Live status dot */}
                                        {doc.availability === 'Available' && (
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '-2px',
                                                right: '-2px',
                                                width: '14px',
                                                height: '14px',
                                                borderRadius: '50%',
                                                background: '#22c55e',
                                                border: `2px solid ${colors.surface}`,
                                            }} />
                                        )}
                                    </div>

                                    <div>
                                        <p style={{
                                            margin: 0,
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            color: isHovered ? '#059669' : colors.textPrimary,
                                            transition: 'color 0.2s',
                                        }}>
                                            {doc.name}
                                        </p>
                                        <p style={{
                                            margin: '4px 0 0',
                                            fontSize: '12px',
                                            color: colors.textSecondary,
                                            fontWeight: 500,
                                        }}>
                                            {doc.specialization}
                                        </p>
                                    </div>
                                </div>

                                {/* Status + Quick Actions */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {/* Quick action icons (show on hover) */}
                                    {isHovered && (
                                        <div style={{
                                            display: 'flex',
                                            gap: '8px',
                                            animation: 'fadeIn 0.2s ease-out',
                                        }}>
                                            <button
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '8px',
                                                    background: colors.inputBg,
                                                    border: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={(e) => { e.stopPropagation(); }}
                                            >
                                                <Phone size={14} color={colors.textSecondary} />
                                            </button>
                                            <button
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '8px',
                                                    background: colors.inputBg,
                                                    border: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={(e) => { e.stopPropagation(); }}
                                            >
                                                <Mail size={14} color={colors.textSecondary} />
                                            </button>
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '6px 12px',
                                        borderRadius: '9999px',
                                        background: availStyle.bg,
                                    }}>
                                        <div style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: availStyle.dot,
                                        }} />
                                        <span style={{
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            color: availStyle.color,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}>
                                            {doc.availability}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div style={{
                padding: '16px 24px',
                borderTop: `1px solid ${colors.border}`,
                background: resolvedTheme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
            }}>
                <button
                    onClick={() => navigate('/doctors')}
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
                        color: '#059669',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #34d399 100%)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = colors.surface;
                        e.currentTarget.style.color = '#059669';
                        e.currentTarget.style.borderColor = colors.border;
                    }}
                >
                    View All Doctors
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default DoctorList;
