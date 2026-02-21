import { useState, useRef, useEffect } from 'react';
import { Search, Bell, LogOut, Settings, ChevronDown, X, Clock, AlertCircle, CheckCircle, Calendar, User, Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';

// Mock notifications data
const initialNotifications = [
    {
        id: 1,
        type: 'appointment',
        title: 'New Appointment',
        message: 'John Doe scheduled an appointment for tomorrow at 10:00 AM',
        time: '5 min ago',
        read: false,
    },
    {
        id: 2,
        type: 'alert',
        title: 'System Update',
        message: 'System maintenance scheduled for tonight at 2:00 AM',
        time: '1 hour ago',
        read: false,
    },
    {
        id: 3,
        type: 'success',
        title: 'Payment Received',
        message: 'Payment of $250 received from Emma Thompson',
        time: '2 hours ago',
        read: true,
    },
    {
        id: 4,
        type: 'appointment',
        title: 'Appointment Reminder',
        message: 'You have 3 appointments scheduled for today',
        time: '3 hours ago',
        read: true,
    },
];

const Header = () => {
    const { currentUser, logout, patients, doctors, resolvedTheme } = useHospital();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);

    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Filter patients and doctors based on search term
    const searchResults = searchTerm.trim().length >= 2 ? {
        patients: patients.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.phone?.includes(searchTerm)
        ).slice(0, 5),
        doctors: doctors.filter(d =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5),
    } : { patients: [], doctors: [] };

    const hasResults = searchResults.patients.length > 0 || searchResults.doctors.length > 0;

    // Close search dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchResultClick = (type: 'patient' | 'doctor') => {
        setSearchTerm('');
        setShowSearchResults(false);
        navigate(type === 'patient' ? '/patients' : '/doctors');
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const getRoleBadgeStyle = (role: string) => {
        switch (role) {
            case 'Admin':
                return { backgroundColor: '#fef3c7', color: '#b45309', borderColor: '#fcd34d' }; // Amber
            case 'Doctor':
                return { backgroundColor: '#dbeafe', color: '#1d4ed8', borderColor: '#93c5fd' }; // Blue
            case 'Nurse':
                return { backgroundColor: '#fce7f3', color: '#be185d', borderColor: '#f9a8d4' }; // Pink
            case 'Patient':
                return { backgroundColor: '#d1fae5', color: '#065f46', borderColor: '#6ee7b7' }; // Emerald
            default:
                return { backgroundColor: '#f1f5f9', color: '#475569', borderColor: '#e2e8f0' }; // Slate
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'appointment':
                return <Calendar size={16} color="#3b82f6" />;
            case 'alert':
                return <AlertCircle size={16} color="#f97316" />;
            case 'success':
                return <CheckCircle size={16} color="#10b981" />;
            default:
                return <Bell size={16} color="#6b7280" />;
        }
    };

    const dismissNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const markAsRead = (id: number) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // Dark mode colors
    const isDark = resolvedTheme === 'dark';

    const colors = {
        headerBg: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        border: isDark ? '#334155' : '#e2e8f0',
        surface: isDark ? '#1e293b' : 'white',
        surfaceHover: isDark ? '#334155' : '#f9fafb',
        surfaceAlt: isDark ? '#0f172a' : '#f9fafb',
        textPrimary: isDark ? '#f8fafc' : '#111827',
        textSecondary: isDark ? '#94a3b8' : '#6b7280',
        textMuted: isDark ? '#64748b' : '#94a3b8',
        inputBg: isDark ? '#1e293b' : '#f9fafb',
        inputBorder: isDark ? '#334155' : '#e5e7eb',
        iconColor: isDark ? '#94a3b8' : '#4b5563',
        shadow: isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        dropdownShadow: isDark
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    };

    return (
        <header style={{
            height: '72px',
            background: colors.headerBg,
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 999,
            boxShadow: colors.shadow,
            width: '100%'
        }}>
            {/* Search Bar with Results Dropdown */}
            <div ref={searchRef} style={{ position: 'relative', width: '320px' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary, zIndex: 1 }}>
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search patients, doctors..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSearchResults(true);
                    }}
                    onFocus={() => setShowSearchResults(true)}
                    style={{
                        width: '100%',
                        padding: '10px 16px 10px 40px',
                        backgroundColor: colors.inputBg,
                        border: `1px solid ${colors.inputBorder}`,
                        borderRadius: showSearchResults && hasResults ? '12px 12px 0 0' : '9999px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        color: colors.textPrimary
                    }}
                />

                {/* Search Results Dropdown */}
                {showSearchResults && searchTerm.trim().length >= 2 && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: colors.surface,
                        border: `1px solid ${colors.border}`,
                        borderTop: 'none',
                        borderRadius: '0 0 12px 12px',
                        boxShadow: colors.dropdownShadow,
                        maxHeight: '400px',
                        overflowY: 'auto',
                        zIndex: 1000,
                    }}>
                        {!hasResults ? (
                            <div style={{ padding: '16px', textAlign: 'center', color: colors.textSecondary }}>
                                No results found for "{searchTerm}"
                            </div>
                        ) : (
                            <>
                                {/* Patients Section */}
                                {searchResults.patients.length > 0 && (
                                    <div>
                                        <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', background: colors.surfaceAlt }}>
                                            Patients
                                        </div>
                                        {searchResults.patients.map(patient => (
                                            <div
                                                key={patient.id}
                                                onClick={() => handleSearchResultClick('patient')}
                                                style={{
                                                    padding: '10px 12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.15s',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = colors.surfaceHover}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <User size={16} color="white" />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{patient.name}</div>
                                                    <div style={{ fontSize: '12px', color: colors.textSecondary }}>{patient.phone || patient.email}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Doctors Section */}
                                {searchResults.doctors.length > 0 && (
                                    <div>
                                        <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', background: colors.surfaceAlt }}>
                                            Doctors
                                        </div>
                                        {searchResults.doctors.map(doctor => (
                                            <div
                                                key={doctor.id}
                                                onClick={() => handleSearchResultClick('doctor')}
                                                style={{
                                                    padding: '10px 12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.15s',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = colors.surfaceHover}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Stethoscope size={16} color="white" />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{doctor.name}</div>
                                                    <div style={{ fontSize: '12px', color: colors.textSecondary }}>{doctor.specialization}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Right Side Actions container with explicit Flex row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>

                {/* Notification Bell */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowProfile(false);
                        }}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.2s',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.surfaceHover}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <Bell size={24} color={colors.iconColor} />
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                width: '18px',
                                height: '18px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `2px solid ${colors.surface}`
                            }}>
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div style={{
                            position: 'absolute',
                            right: '-10px',
                            top: '50px',
                            width: '380px',
                            backgroundColor: colors.surface,
                            borderRadius: '16px',
                            boxShadow: colors.dropdownShadow,
                            border: `1px solid ${colors.border}`,
                            zIndex: 1000,
                            overflow: 'hidden',
                            animation: 'fadeIn 0.2s ease-out'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '20px 24px',
                                borderBottom: `1px solid ${colors.border}`,
                                background: isDark ? 'linear-gradient(135deg, #0d1628 0%, #0f2044 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                            }}>
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: colors.textPrimary }}>Notifications</h3>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            style={{
                                                fontSize: '13px',
                                                color: '#2563eb',
                                                fontWeight: '600',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '6px 10px',
                                                borderRadius: '8px',
                                                fontFamily: 'inherit',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            Mark all read
                                        </button>
                                    )}
                                    {notifications.length > 0 && (
                                        <button
                                            onClick={clearAllNotifications}
                                            style={{
                                                fontSize: '13px',
                                                color: colors.textSecondary,
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '6px 10px',
                                                borderRadius: '8px',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.surfaceHover}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {notifications.length === 0 ? (
                                    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                                        <div style={{ width: '64px', height: '64px', backgroundColor: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                            <Bell size={32} color="#9ca3af" />
                                        </div>
                                        <p style={{ margin: '0 0 4px', color: '#111827', fontWeight: '500' }}>No notifications</p>
                                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>You're all caught up!</p>
                                    </div>
                                ) : (
                                    <div>
                                        {notifications.map(notification => (
                                            <div
                                                key={notification.id}
                                                onClick={() => markAsRead(notification.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '16px',
                                                    padding: '20px 24px',
                                                    borderBottom: `1px solid ${colors.border}`,
                                                    cursor: 'pointer',
                                                    backgroundColor: !notification.read
                                                        ? (isDark ? 'rgba(37, 99, 235, 0.08)' : '#f0f7ff')
                                                        : 'transparent',
                                                    transition: 'all 0.2s',
                                                    position: 'relative'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = !notification.read
                                                    ? (isDark ? 'rgba(37, 99, 235, 0.12)' : '#e0efff')
                                                    : colors.surfaceHover}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = !notification.read
                                                    ? (isDark ? 'rgba(37, 99, 235, 0.08)' : '#f0f7ff')
                                                    : 'transparent'}
                                            >
                                                {!notification.read && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: '20px',
                                                        bottom: '20px',
                                                        width: '4px',
                                                        backgroundColor: '#2563eb',
                                                        borderRadius: '0 4px 4px 0'
                                                    }} />
                                                )}
                                                <div style={{
                                                    padding: '10px',
                                                    backgroundColor: isDark ? '#1a2840' : 'white',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                    border: `1px solid ${isDark ? '#1e3050' : '#f1f5f9'}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#2563eb'
                                                }}>
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                                        <p style={{
                                                            margin: 0,
                                                            fontSize: '15px',
                                                            fontWeight: !notification.read ? '700' : '600',
                                                            color: colors.textPrimary
                                                        }}>
                                                            {notification.title}
                                                        </p>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                dismissNotification(notification.id);
                                                            }}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                padding: '6px',
                                                                borderRadius: '50%',
                                                                color: colors.textMuted,
                                                                display: 'flex',
                                                                transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = '#fee2e2';
                                                                e.currentTarget.style.color = '#dc2626';
                                                                e.currentTarget.style.transform = 'scale(1.1)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                                e.currentTarget.style.color = colors.textMuted;
                                                                e.currentTarget.style.transform = 'scale(1)';
                                                            }}
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                    <p style={{ margin: '0 0 8px', fontSize: '14px', color: colors.textPrimary, lineHeight: '1.4' }}>
                                                        {notification.message}
                                                    </p>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: colors.textSecondary }}>
                                                        <Clock size={12} />
                                                        {notification.time}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Vertical Divider */}
                <div style={{ width: '1px', height: '32px', backgroundColor: '#e5e7eb' }}></div>

                {/* Profile Section */}
                <div style={{ position: 'relative' }}>
                    {currentUser ? (
                        <button
                            onClick={() => {
                                setShowProfile(!showProfile);
                                setShowNotifications(false);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: showProfile ? colors.surface : 'transparent',
                                border: '1px solid',
                                borderColor: showProfile ? colors.border : 'transparent',
                                borderRadius: '9999px',
                                padding: '6px 16px 6px 6px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: showProfile ? colors.shadow : 'none'
                            }}
                            onMouseEnter={(e) => { if (!showProfile) e.currentTarget.style.backgroundColor = colors.surfaceHover; }}
                            onMouseLeave={(e) => { if (!showProfile) e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)',
                                overflow: 'hidden'
                            }}>
                                {currentUser.avatar ? (
                                    <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: colors.textPrimary, lineHeight: '1' }}>
                                    {currentUser.name}
                                </span>
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    padding: '2px 8px',
                                    borderRadius: '9999px',
                                    border: `1px solid ${getRoleBadgeStyle(currentUser.role).borderColor}`,
                                    backgroundColor: getRoleBadgeStyle(currentUser.role).backgroundColor,
                                    color: getRoleBadgeStyle(currentUser.role).color
                                }}>
                                    {currentUser.role}
                                </span>
                            </div>
                            <ChevronDown
                                size={16}
                                color={colors.textSecondary}
                                style={{
                                    transform: showProfile ? 'rotate(180deg)' : 'none',
                                    transition: 'transform 0.2s'
                                }}
                            />
                        </button>
                    ) : (
                        // Fallback state if no user is logged in (though app should probably redirect to login)
                        <div style={{ padding: '8px 16px', color: colors.textSecondary, fontSize: '14px' }}>Guest</div>
                    )}

                    {/* Profile Dropdown */}
                    {showProfile && currentUser && (
                        <div style={{
                            position: 'absolute',
                            right: '0',
                            top: '60px',
                            width: '280px',
                            backgroundColor: colors.surface,
                            borderRadius: '16px',
                            boxShadow: colors.dropdownShadow,
                            border: `1px solid ${colors.border}`,
                            zIndex: 1000,
                            overflow: 'hidden',
                            animation: 'fadeIn 0.2s ease-out'
                        }}>
                            <div style={{
                                padding: '24px',
                                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ position: 'absolute', top: -20, right: -20, width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 10 }}>
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid rgba(255,255,255,0.4)',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        overflow: 'hidden'
                                    }}>
                                        {currentUser.avatar ? (
                                            <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: '16px', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</div>
                                        <div style={{ fontSize: '13px', opacity: 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.email}</div>
                                        <div style={{
                                            display: 'inline-block',
                                            padding: '2px 10px',
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                            borderRadius: '9999px',
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            marginTop: '8px'
                                        }}>
                                            {currentUser.role}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '8px' }}>
                                <Link to="/settings"
                                    onClick={() => setShowProfile(false)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 16px',
                                        textDecoration: 'none',
                                        color: colors.textPrimary,
                                        borderRadius: '12px',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.surfaceHover}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div style={{ padding: '8px', backgroundColor: colors.inputBg, borderRadius: '8px', display: 'flex' }}>
                                        <Settings size={18} color={colors.iconColor} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600' }}>Settings</div>
                                        <div style={{ fontSize: '12px', color: colors.textSecondary }}>Manage preferences</div>
                                    </div>
                                </Link>

                                <div style={{ height: '1px', backgroundColor: colors.border, margin: '4px 0' }}></div>

                                <button
                                    onClick={() => {
                                        logout();
                                        setShowProfile(false);
                                    }}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 16px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        borderRadius: '12px',
                                        transition: 'background-color 0.2s',
                                        color: '#ef4444'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div style={{ padding: '8px', backgroundColor: '#fee2e2', borderRadius: '8px', display: 'flex' }}>
                                        <LogOut size={18} color="#ef4444" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600' }}>Logout</div>
                                        <div style={{ fontSize: '12px', color: '#f87171' }}>Sign out of account</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Backdrop for dropdowns */}
            {(showNotifications || showProfile) && (
                <div
                    style={{ position: 'fixed', inset: 0, zIndex: 900, cursor: 'default' }}
                    onClick={() => {
                        setShowNotifications(false);
                        setShowProfile(false);
                    }}
                />
            )}
        </header>
    );
};

export default Header;
