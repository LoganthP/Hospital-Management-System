import { useState } from 'react';
import Layout from '../components/Layout';
import Input from '../components/Input';
import { useHospital } from '../context/HospitalContext';
import { Settings as SettingsIcon, Bell, Shield, User, Save, Mail, Building, Users, Clock, Activity, Lock, Key, Smartphone, AlertTriangle, CheckCircle } from 'lucide-react';

const Settings = () => {
    const { theme, colors, loginHistory } = useHospital();
    const [activeTab, setActiveTab] = useState('general');
    const [hospitalName, setHospitalName] = useState('HealthHub Central');
    const [email, setEmail] = useState('admin@healthhub.com');
    const [notifications, setNotifications] = useState(true);

    // Notification settings state
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [appointmentReminders, setAppointmentReminders] = useState(true);
    const [billingAlerts, setBillingAlerts] = useState(false);
    const [systemAlerts, setSystemAlerts] = useState(true);

    // Security settings state
    const [sessionTimeout, setSessionTimeout] = useState('30');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // Toast notification state
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSave = () => {
        // In a real app, this would be an API call
        setSaveSuccess(true);
        setTimeout(() => {
            setSaveSuccess(false);
        }, 3000);
    };

    const tabs = [
        {
            id: 'general',
            label: 'General',
            icon: User,
            gradientFrom: '#60a5fa',
            gradientTo: '#2563eb',
            shadow: '#1e40af',
            glow: 'rgba(59, 130, 246, 0.5)',
            border: '#93c5fd'
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: Bell,
            gradientFrom: '#c084fc',
            gradientTo: '#9333ea',
            shadow: '#6b21a8',
            glow: 'rgba(168, 85, 247, 0.5)',
            border: '#d8b4fe'
        },
        {
            id: 'security',
            label: 'Security',
            icon: Shield,
            gradientFrom: '#34d399',
            gradientTo: '#059669',
            shadow: '#047857',
            glow: 'rgba(16, 185, 129, 0.5)',
            border: '#6ee7b7'
        },
        {
            id: 'admin',
            label: 'Admin & Users',
            icon: Users,
            gradientFrom: '#fb923c',
            gradientTo: '#ea580c',
            shadow: '#c2410c',
            glow: 'rgba(251, 146, 60, 0.5)',
            border: '#fdba74'
        },
    ];

    // Mock data removed in favor of live loginHistory from context



    return (
        <Layout>
            {/* Success Toast Notification */}
            {saveSuccess && (
                <div className="fixed top-6 right-6 z-50 animate-fade-in">
                    <div className="flex items-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg shadow-emerald-200">
                        <CheckCircle size={24} />
                        <div>
                            <p className="font-semibold">Preferences Saved!</p>
                            <p className="text-sm text-emerald-100">Your settings have been updated successfully.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 style={{ color: colors.textPrimary }} className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <div style={{ background: colors.inputBg, color: '#4f46e5' }} className="p-2 rounded-lg">
                            <SettingsIcon size={28} />
                        </div>
                        Settings
                    </h1>
                    <p style={{ color: colors.textSecondary }} className="text-lg ml-14">Manage your hospital preferences and configuration.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Settings Sidebar - Glossy 3D Buttons */}
                    <div className="lg:col-span-1 flex flex-col gap-4 sticky top-24">
                        {/* Account Section */}
                        <div className="mb-2">
                            <h3 style={{ color: colors.textMuted }} className="text-xs font-bold uppercase tracking-wider mb-3 px-1">Account</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {tabs.slice(0, 3).map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                padding: '16px 24px',
                                                borderRadius: '9999px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                border: isActive ? `3px solid ${tab.border}` : `3px solid ${colors.border}`,
                                                background: isActive
                                                    ? `linear-gradient(180deg, ${tab.gradientFrom} 0%, ${tab.gradientTo} 100%)`
                                                    : colors.surface,
                                                boxShadow: isActive
                                                    ? `0 6px 0 0 ${tab.shadow}, 0 12px 30px 0 ${tab.glow}`
                                                    : `0 4px 0 0 ${theme === 'dark' ? '#111827' : '#cbd5e1'}, ${colors.shadow}`,
                                                color: isActive ? '#ffffff' : colors.textPrimary,
                                                transition: 'all 0.2s ease',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {/* Glossy Shine Overlay */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '50%',
                                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)',
                                                    borderRadius: '9999px 9999px 0 0',
                                                    pointerEvents: 'none',
                                                }}
                                            />

                                            {/* Button Content */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
                                                <Icon size={20} style={{ filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none' }} />
                                                <span style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '13px' }}>
                                                    {tab.label}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Administration Section */}
                        <div>
                            <h3 style={{ color: colors.textMuted }} className="text-xs font-bold uppercase tracking-wider mb-3 px-1">Administration</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {tabs.slice(3).map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                padding: '16px 24px',
                                                borderRadius: '9999px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                border: isActive ? `3px solid ${tab.border}` : `3px solid ${colors.border}`,
                                                background: isActive
                                                    ? `linear-gradient(180deg, ${tab.gradientFrom} 0%, ${tab.gradientTo} 100%)`
                                                    : colors.surface,
                                                boxShadow: isActive
                                                    ? `0 6px 0 0 ${tab.shadow}, 0 12px 30px 0 ${tab.glow}`
                                                    : `0 4px 0 0 ${theme === 'dark' ? '#111827' : '#cbd5e1'}, ${colors.shadow}`,
                                                color: isActive ? '#ffffff' : colors.textPrimary,
                                                transition: 'all 0.2s ease',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {/* Glossy Shine Overlay */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '50%',
                                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)',
                                                    borderRadius: '9999px 9999px 0 0',
                                                    pointerEvents: 'none',
                                                }}
                                            />

                                            {/* Button Content */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
                                                <Icon size={20} style={{ filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none' }} />
                                                <span style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '13px' }}>
                                                    {tab.label}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Settings Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'general' && (
                            <div className="space-y-6 animate-fade-in">
                                <div style={{
                                    background: colors.surface,
                                    borderRadius: '16px',
                                    border: `1px solid ${colors.border}`,
                                    overflow: 'hidden',
                                    boxShadow: colors.shadow
                                }}>
                                    <div style={{
                                        padding: '16px 24px',
                                        background: theme === 'dark' ? '#1f2937' : '#f8fafc',
                                        borderBottom: `1px solid ${colors.border}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>General Information</h3>
                                    </div>
                                    <div style={{ padding: '24px' }} className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-2">
                                                <label style={{ color: colors.textPrimary }} className="text-sm font-semibold flex items-center gap-2">
                                                    <Building size={14} style={{ color: colors.textMuted }} /> Hospital Name
                                                </label>
                                                <Input
                                                    value={hospitalName}
                                                    onChange={(e) => setHospitalName(e.target.value)}
                                                    fullWidth
                                                    placeholder="Enter hospital name"
                                                    style={{ background: 'white', color: '#111827' }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label style={{ color: colors.textPrimary }} className="text-sm font-semibold flex items-center gap-2">
                                                    <Mail size={14} style={{ color: colors.textMuted }} /> Admin Email
                                                </label>
                                                <Input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    fullWidth
                                                    placeholder="admin@example.com"
                                                    style={{ background: 'white', color: '#111827' }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <h4 style={{ color: colors.textPrimary }} className="text-sm font-semibold mb-4">Preferences</h4>
                                            <div style={{
                                                background: '#1a202c',
                                                padding: '12px 20px',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }}>
                                                <input
                                                    type="checkbox"
                                                    checked={notifications}
                                                    onChange={(e) => setNotifications(e.target.checked)}
                                                    style={{
                                                        appearance: 'none',
                                                        width: '18px',
                                                        height: '18px',
                                                        borderRadius: '4px',
                                                        border: 'none',
                                                        background: notifications ? '#ef4444' : '#4a5568',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.2s'
                                                    }}
                                                />
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Email Notifications</span>
                                                    <span style={{ color: '#718096', fontSize: '13px' }}>Receive daily digests and critical alerts via email.</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-start pt-2">
                                            <button
                                                onClick={handleSave}
                                                style={{
                                                    background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
                                                    color: 'white',
                                                    padding: '10px 20px',
                                                    borderRadius: '12px',
                                                    border: 'none',
                                                    fontWeight: 700,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 15px rgba(217, 70, 239, 0.4)',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                            >
                                                <Save size={18} /> Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'admin' && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Active Users Summary - Premium Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Total Users Card */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '16px',
                                        padding: '24px',
                                        color: 'white',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 40px -10px rgba(102, 126, 234, 0.5)'
                                    }}>
                                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: 500 }}>Total Users</p>
                                                <h3 style={{ fontSize: '36px', fontWeight: 700, margin: 0, lineHeight: 1 }}>24</h3>
                                                <p style={{ fontSize: '12px', marginTop: '12px', opacity: 0.8 }}>
                                                    <span style={{ color: '#a5f3fc' }}>↑ 12%</span> from last month
                                                </p>
                                            </div>
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                background: 'rgba(255,255,255,0.2)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backdropFilter: 'blur(10px)'
                                            }}>
                                                <Users size={28} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Active Now Card */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                        borderRadius: '16px',
                                        padding: '24px',
                                        color: 'white',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 40px -10px rgba(17, 153, 142, 0.5)'
                                    }}>
                                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: 500 }}>Active Now</p>
                                                <h3 style={{ fontSize: '36px', fontWeight: 700, margin: 0, lineHeight: 1 }}>3</h3>
                                                <p style={{ fontSize: '12px', marginTop: '12px', opacity: 0.8 }}>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                        <span style={{ width: '8px', height: '8px', background: '#a5f3fc', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
                                                        Online right now
                                                    </span>
                                                </p>
                                            </div>
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                background: 'rgba(255,255,255,0.2)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backdropFilter: 'blur(10px)'
                                            }}>
                                                <Activity size={28} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Avg Session Card */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                        borderRadius: '16px',
                                        padding: '24px',
                                        color: 'white',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 40px -10px rgba(240, 147, 251, 0.5)'
                                    }}>
                                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: 500 }}>Avg. Session</p>
                                                <h3 style={{ fontSize: '36px', fontWeight: 700, margin: 0, lineHeight: 1 }}>45m</h3>
                                                <p style={{ fontSize: '12px', marginTop: '12px', opacity: 0.8 }}>
                                                    <span style={{ color: '#a5f3fc' }}>↑ 8%</span> vs last week
                                                </p>
                                            </div>
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                background: 'rgba(255,255,255,0.2)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backdropFilter: 'blur(10px)'
                                            }}>
                                                <Clock size={28} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Login History Table - Premium Design */}
                                <div style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    {/* Table Header */}
                                    <div style={{
                                        padding: '20px 24px',
                                        borderBottom: `1px solid ${colors.border}`,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(255,255,255,0.2)',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Clock size={20} color="white" />
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'white' }}>Login History</h3>
                                                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Recent user activity log</p>
                                            </div>
                                        </div>
                                        <span style={{
                                            padding: '6px 12px',
                                            background: 'rgba(255,255,255,0.2)',
                                            borderRadius: '9999px',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            color: 'white'
                                        }}>
                                            Last 7 days
                                        </span>
                                    </div>

                                    {/* Table Content */}
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ background: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb' }}>
                                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User</th>
                                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</th>
                                                    <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loginHistory.map((log, index) => (
                                                    <tr
                                                        key={log.id}
                                                        style={{
                                                            background: index % 2 === 0 ? colors.surface : colors.inputBg,
                                                            borderBottom: `1px solid ${colors.border}`,
                                                            transition: 'background-color 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.background = colors.surfaceHover}
                                                        onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? colors.surface : colors.inputBg}
                                                    >
                                                        <td style={{ padding: '16px 24px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <div style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '50%',
                                                                    background: log.role === 'Doctor'
                                                                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                                        : log.role === 'Admin'
                                                                            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                                                                            : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    color: 'white',
                                                                    fontWeight: 700,
                                                                    fontSize: '14px'
                                                                }}>
                                                                    {log.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                                </div>
                                                                <span style={{ fontWeight: 600, color: colors.textPrimary }}>{log.user}</span>
                                                            </div>
                                                        </td>
                                                        <td style={{ padding: '16px 24px' }}>
                                                            <span style={{
                                                                display: 'inline-block',
                                                                padding: '6px 12px',
                                                                borderRadius: '9999px',
                                                                fontSize: '12px',
                                                                fontWeight: 600,
                                                                background: log.role === 'Doctor'
                                                                    ? '#dbeafe'
                                                                    : log.role === 'Admin'
                                                                        ? '#f3e8ff'
                                                                        : '#dcfce7',
                                                                color: log.role === 'Doctor'
                                                                    ? '#1d4ed8'
                                                                    : log.role === 'Admin'
                                                                        ? '#7e22ce'
                                                                        : '#15803d',
                                                                border: `1px solid ${log.role === 'Doctor'
                                                                    ? '#bfdbfe'
                                                                    : log.role === 'Admin'
                                                                        ? '#d8b4fe'
                                                                        : '#86efac'}`
                                                            }}>
                                                                {log.role}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '16px 24px', color: colors.textSecondary, fontSize: '14px' }}>
                                                            {log.date}
                                                        </td>
                                                        <td style={{ padding: '16px 24px', color: colors.textSecondary, fontSize: '14px', fontFamily: 'monospace' }}>
                                                            {log.time}
                                                        </td>
                                                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                                            <span style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                padding: '6px 12px',
                                                                borderRadius: '9999px',
                                                                fontSize: '12px',
                                                                fontWeight: 600,
                                                                background: log.status === 'Active' ? 'rgba(34, 197, 94, 0.15)' : colors.inputBg,
                                                                color: log.status === 'Active' ? '#22c55e' : colors.textSecondary
                                                            }}>
                                                                {log.status === 'Active' && (
                                                                    <span style={{
                                                                        width: '8px',
                                                                        height: '8px',
                                                                        background: '#22c55e',
                                                                        borderRadius: '50%',
                                                                        boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.3)'
                                                                    }}></span>
                                                                )}
                                                                {log.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Table Footer */}
                                    <div style={{
                                        padding: '16px 24px',
                                        borderTop: `1px solid ${colors.border}`,
                                        background: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{ fontSize: '14px', color: colors.textSecondary }}>
                                            Showing {loginHistory.length} entries
                                        </span>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={{
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                border: `1px solid ${colors.border}`,
                                                background: colors.surface,
                                                fontSize: '13px',
                                                fontWeight: 500,
                                                color: colors.textPrimary,
                                                cursor: 'pointer'
                                            }}>
                                                Previous
                                            </button>
                                            <button style={{
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                border: `1px solid ${colors.border}`,
                                                background: colors.surface,
                                                fontSize: '13px',
                                                fontWeight: 500,
                                                color: colors.textPrimary,
                                                cursor: 'pointer'
                                            }}>
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Notification Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Enabled Notifications Count */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #c084fc 0%, #9333ea 100%)',
                                        borderRadius: '16px',
                                        padding: '24px',
                                        color: 'white',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 40px -10px rgba(147, 51, 234, 0.5)'
                                    }}>
                                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px', fontWeight: 500 }}>Active Notifications</p>
                                                <h3 style={{ fontSize: '36px', fontWeight: 700, margin: 0, lineHeight: 1 }}>
                                                    {[emailNotifications, pushNotifications, appointmentReminders, billingAlerts, systemAlerts].filter(Boolean).length}
                                                </h3>
                                                <p style={{ fontSize: '12px', marginTop: '12px', opacity: 0.8 }}>
                                                    of 5 notification types enabled
                                                </p>
                                            </div>
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                background: 'rgba(255,255,255,0.2)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backdropFilter: 'blur(10px)'
                                            }}>
                                                <Bell size={28} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions Card */}
                                    <div style={{
                                        background: colors.surface,
                                        borderRadius: '16px',
                                        padding: '24px',
                                        border: `1px solid ${colors.border}`,
                                        boxShadow: colors.shadow
                                    }}>
                                        <h4 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Quick Actions</h4>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button
                                                onClick={() => {
                                                    setEmailNotifications(true);
                                                    setPushNotifications(true);
                                                    setAppointmentReminders(true);
                                                    setBillingAlerts(true);
                                                    setSystemAlerts(true);
                                                }}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 16px',
                                                    borderRadius: '10px',
                                                    border: '1px solid #10b981',
                                                    background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                                                    color: '#047857',
                                                    fontWeight: 600,
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <CheckCircle size={16} /> Enable All
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEmailNotifications(false);
                                                    setPushNotifications(false);
                                                    setAppointmentReminders(false);
                                                    setBillingAlerts(false);
                                                    setSystemAlerts(false);
                                                }}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 16px',
                                                    borderRadius: '10px',
                                                    border: '1px solid #f87171',
                                                    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                                                    color: '#dc2626',
                                                    fontWeight: 600,
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <AlertTriangle size={16} /> Disable All
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Notification Preferences Card */}
                                <div style={{
                                    background: colors.surface,
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: colors.shadow,
                                    border: `1px solid ${colors.border}`
                                }}>
                                    {/* Card Header */}
                                    <div style={{
                                        padding: '20px 24px',
                                        borderBottom: `1px solid ${colors.border}`,
                                        background: 'linear-gradient(135deg, #c084fc 0%, #9333ea 100%)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(255,255,255,0.2)',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Bell size={20} color="white" />
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'white' }}>Notification Preferences</h3>
                                                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Manage how you receive alerts</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notification Options */}
                                    <div style={{ padding: '8px' }}>
                                        {/* Email Notifications */}
                                        <div
                                            onClick={() => setEmailNotifications(!emailNotifications)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '20px',
                                                margin: '8px',
                                                borderRadius: '12px',
                                                background: emailNotifications ? 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)' : '#f9fafb',
                                                border: emailNotifications ? '2px solid #c084fc' : '2px solid transparent',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #c084fc 0%, #9333ea 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
                                                }}>
                                                    <Mail size={24} color="white" />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>Email Notifications</h4>
                                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSecondary }}>Receive updates and alerts via email</p>
                                                </div>
                                            </div>
                                            <div style={{
                                                width: '52px',
                                                height: '28px',
                                                borderRadius: '14px',
                                                background: emailNotifications ? 'linear-gradient(135deg, #c084fc 0%, #9333ea 100%)' : '#d1d5db',
                                                position: 'relative',
                                                transition: 'all 0.3s',
                                                boxShadow: emailNotifications ? '0 2px 8px rgba(147, 51, 234, 0.4)' : 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: emailNotifications ? '26px' : '2px',
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: 'white',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                    transition: 'all 0.3s'
                                                }}></div>
                                            </div>
                                        </div>

                                        {/* Push Notifications */}
                                        <div
                                            onClick={() => setPushNotifications(!pushNotifications)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '20px',
                                                margin: '8px',
                                                borderRadius: '12px',
                                                background: pushNotifications ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : '#f9fafb',
                                                border: pushNotifications ? '2px solid #60a5fa' : '2px solid transparent',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                                                }}>
                                                    <Smartphone size={24} color="white" />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>Push Notifications</h4>
                                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSecondary }}>Get instant alerts on your device</p>
                                                </div>
                                            </div>
                                            <div style={{
                                                width: '52px',
                                                height: '28px',
                                                borderRadius: '14px',
                                                background: pushNotifications ? 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)' : '#d1d5db',
                                                position: 'relative',
                                                transition: 'all 0.3s',
                                                boxShadow: pushNotifications ? '0 2px 8px rgba(37, 99, 235, 0.4)' : 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: pushNotifications ? '26px' : '2px',
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: 'white',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                    transition: 'all 0.3s'
                                                }}></div>
                                            </div>
                                        </div>

                                        {/* Appointment Reminders */}
                                        <div
                                            onClick={() => setAppointmentReminders(!appointmentReminders)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '20px',
                                                margin: '8px',
                                                borderRadius: '12px',
                                                background: appointmentReminders ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' : '#f9fafb',
                                                border: appointmentReminders ? '2px solid #34d399' : '2px solid transparent',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                                                }}>
                                                    <Clock size={24} color="white" />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>Appointment Reminders</h4>
                                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSecondary }}>Get notified before scheduled appointments</p>
                                                </div>
                                            </div>
                                            <div style={{
                                                width: '52px',
                                                height: '28px',
                                                borderRadius: '14px',
                                                background: appointmentReminders ? 'linear-gradient(135deg, #34d399 0%, #059669 100%)' : '#d1d5db',
                                                position: 'relative',
                                                transition: 'all 0.3s',
                                                boxShadow: appointmentReminders ? '0 2px 8px rgba(5, 150, 105, 0.4)' : 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: appointmentReminders ? '26px' : '2px',
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: 'white',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                    transition: 'all 0.3s'
                                                }}></div>
                                            </div>
                                        </div>

                                        {/* Billing Alerts */}
                                        <div
                                            onClick={() => setBillingAlerts(!billingAlerts)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '20px',
                                                margin: '8px',
                                                borderRadius: '12px',
                                                background: billingAlerts ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' : '#f9fafb',
                                                border: billingAlerts ? '2px solid #fbbf24' : '2px solid transparent',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
                                                }}>
                                                    <AlertTriangle size={24} color="white" />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>Billing Alerts</h4>
                                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSecondary }}>Notifications for payments and invoices</p>
                                                </div>
                                            </div>
                                            <div style={{
                                                width: '52px',
                                                height: '28px',
                                                borderRadius: '14px',
                                                background: billingAlerts ? 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' : '#d1d5db',
                                                position: 'relative',
                                                transition: 'all 0.3s',
                                                boxShadow: billingAlerts ? '0 2px 8px rgba(217, 119, 6, 0.4)' : 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: billingAlerts ? '26px' : '2px',
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: 'white',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                    transition: 'all 0.3s'
                                                }}></div>
                                            </div>
                                        </div>

                                        {/* System Alerts */}
                                        <div
                                            onClick={() => setSystemAlerts(!systemAlerts)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '20px',
                                                margin: '8px',
                                                borderRadius: '12px',
                                                background: systemAlerts ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' : '#f9fafb',
                                                border: systemAlerts ? '2px solid #f87171' : '2px solid transparent',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                                                }}>
                                                    <Shield size={24} color="white" />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.textPrimary }}>System Alerts</h4>
                                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSecondary }}>Critical system and security notifications</p>
                                                </div>
                                            </div>
                                            <div style={{
                                                width: '52px',
                                                height: '28px',
                                                borderRadius: '14px',
                                                background: systemAlerts ? 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)' : '#d1d5db',
                                                position: 'relative',
                                                transition: 'all 0.3s',
                                                boxShadow: systemAlerts ? '0 2px 8px rgba(220, 38, 38, 0.4)' : 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: systemAlerts ? '26px' : '2px',
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: 'white',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                    transition: 'all 0.3s'
                                                }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Button Footer */}
                                    <div style={{
                                        padding: '20px 24px',
                                        borderTop: `1px solid ${colors.border}`,
                                        background: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: '12px'
                                    }}>
                                        <button
                                            onClick={handleSave}
                                            style={{
                                                padding: '12px 24px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #c084fc 0%, #9333ea 100%)',
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4)'
                                            }}
                                        >
                                            <Save size={18} /> Save Preferences
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Admin & Users Header indicator from screenshot */}
                                <div style={{
                                    height: '40px',
                                    background: 'linear-gradient(180deg, #2d3748 0%, #1a202c 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTop: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                                    marginBottom: '24px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '1px',
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
                                    }} />
                                    <div style={{
                                        padding: '4px 16px',
                                        borderRadius: '9999px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: 'white',
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em'
                                    }}>
                                        <Users size={14} /> ADMIN & USERS
                                    </div>
                                </div>

                                <div style={{
                                    background: colors.surface,
                                    borderRadius: '16px',
                                    border: `1px solid ${colors.border}`,
                                    overflow: 'hidden',
                                    boxShadow: colors.shadow,
                                    marginBottom: '24px'
                                }}>
                                    <div style={{ padding: '20px 24px' }}>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>Two-Factor Authentication</h3>
                                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <Key size={18} style={{ color: colors.textMuted }} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span style={{ color: 'white', fontSize: '15px' }}>Enable 2FA</span>
                                                <span style={{ color: colors.textSecondary, fontSize: '13px' }}>Add an extra layer of security to your account</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    background: colors.surface,
                                    borderRadius: '16px',
                                    border: `1px solid ${colors.border}`,
                                    overflow: 'hidden',
                                    boxShadow: colors.shadow,
                                    marginBottom: '24px'
                                }}>
                                    <div style={{ padding: '20px 24px' }}>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>Session Settings</h3>
                                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                            <div style={{ marginTop: '8px' }}>
                                                <Clock size={24} style={{ color: 'white' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ color: 'white', display: 'block', fontSize: '14px', marginBottom: '8px' }}>Session Timeout</label>
                                                <select
                                                    value={sessionTimeout}
                                                    onChange={(e) => setSessionTimeout(e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        background: '#1a202c',
                                                        color: 'white',
                                                        border: `1px solid ${colors.border}`,
                                                        padding: '10px 16px',
                                                        borderRadius: '8px',
                                                        outline: 'none',
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    <option value="15">15 minutes</option>
                                                    <option value="30">30 minutes</option>
                                                    <option value="60">1 hour</option>
                                                </select>
                                                <p style={{ margin: '8px 0 0', fontSize: '13px', color: colors.textSecondary }}>Automatically log out after inactivity</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    background: colors.surface,
                                    borderRadius: '16px',
                                    border: `1px solid ${colors.border}`,
                                    overflow: 'hidden',
                                    boxShadow: colors.shadow
                                }}>
                                    <div style={{ padding: '20px 24px' }}>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>Change Password</h3>
                                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                            <Lock size={16} style={{ color: colors.textMuted }} />
                                            <span style={{ color: colors.textSecondary, fontSize: '13px' }}>Enter your current password and choose a new one</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Current Password</label>
                                                <Input
                                                    type="password"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    fullWidth
                                                    placeholder="Enter current password"
                                                    style={{ background: 'white', color: '#111827' }}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>New Password</label>
                                                <Input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    fullWidth
                                                    placeholder="Enter new password"
                                                    style={{ background: 'white', color: '#111827' }}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Confirm Password</label>
                                                <Input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    fullWidth
                                                    placeholder="Confirm new password"
                                                    style={{ background: 'white', color: '#111827' }}
                                                />
                                            </div>

                                            <div className="pt-2">
                                                <button
                                                    onClick={handleSave}
                                                    style={{
                                                        background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
                                                        color: 'white',
                                                        padding: '10px 20px',
                                                        borderRadius: '10px',
                                                        border: 'none',
                                                        fontWeight: 700,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        cursor: 'pointer',
                                                        boxShadow: '0 4px 15px rgba(217, 70, 239, 0.4)',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                >
                                                    <Save size={18} /> Update Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
