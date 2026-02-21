import { useState } from 'react';
import Layout from '../components/Layout';
import Input from '../components/Input';
import { useHospital } from '../context/HospitalContext';
import { Settings as SettingsIcon, Bell, Shield, User, Save, Mail, Building, Users, Clock, Activity, Lock, Key, Smartphone, AlertTriangle, CheckCircle, IndianRupee } from 'lucide-react';

const Settings = () => {
    const { resolvedTheme, colors, loginHistory } = useHospital();
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
            gradientFrom: '#2563eb',
            gradientTo: '#1d4ed8',
            shadow: '#1e40af',
            glow: 'rgba(37, 99, 235, 0.5)',
            border: '#60a5fa'
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: Bell,
            gradientFrom: '#2563eb',
            gradientTo: '#1d4ed8',
            shadow: '#1e40af',
            glow: 'rgba(37, 99, 235, 0.4)',
            border: '#60a5fa'
        },
        {
            id: 'security',
            label: 'Security',
            icon: Shield,
            gradientFrom: '#2563eb',
            gradientTo: '#1d4ed8',
            shadow: '#1e40af',
            glow: 'rgba(37, 99, 235, 0.4)',
            border: '#60a5fa'
        },
        {
            id: 'admin',
            label: 'Admin & Users',
            icon: Users,
            gradientFrom: '#2563eb',
            gradientTo: '#1d4ed8',
            shadow: '#1e40af',
            glow: 'rgba(37, 99, 235, 0.4)',
            border: '#60a5fa'
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
                            <h3 style={{ color: colors.textMuted }} className="text-xs font-bold uppercase tracking-wider mb-4 px-1">Account</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                                                padding: '18px 24px',
                                                borderRadius: '9999px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                border: isActive ? `1.5px solid rgba(255, 255, 255, 0.4)` : `3px solid ${resolvedTheme === 'dark' ? '#0f172a' : '#cbd5e1'}`,
                                                background: isActive
                                                    ? `linear-gradient(180deg, ${tab.gradientFrom} 0%, ${tab.gradientTo} 100%)`
                                                    : `linear-gradient(180deg, ${resolvedTheme === 'dark' ? '#2d3748' : '#64748b'} 0%, ${resolvedTheme === 'dark' ? '#1a202c' : '#334155'} 100%)`,
                                                boxShadow: isActive
                                                    ? `0 6px 0 0 ${tab.shadow}, 0 12px 30px 0 ${tab.glow}`
                                                    : `0 4px 0 0 ${resolvedTheme === 'dark' ? '#0f172a' : '#1e293b'}, 0 6px 15px rgba(0, 0, 0, 0.2)`,
                                                color: '#ffffff',
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                overflow: 'hidden',
                                                transform: isActive ? 'translateY(2px)' : 'none',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = `0 6px 0 0 ${resolvedTheme === 'dark' ? '#0f172a' : '#1e293b'}, 0 12px 25px rgba(0, 0, 0, 0.3)`;
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.transform = 'none';
                                                    e.currentTarget.style.boxShadow = `0 4px 0 0 ${resolvedTheme === 'dark' ? '#0f172a' : '#1e293b'}, 0 6px 15px rgba(0, 0, 0, 0.2)`;
                                                }
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
                                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
                                                    borderRadius: '9999px 9999px 0 0',
                                                    pointerEvents: 'none',
                                                    borderTop: '1px solid rgba(255,255,255,0.4)',
                                                }}
                                            />

                                            {/* Button Content */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
                                                <Icon size={18} style={{ color: 'white', opacity: isActive ? 1 : 0.8 }} />
                                                <span style={{ fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '12px', color: 'white' }}>
                                                    {tab.label}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Administration Section */}
                        <div className="mt-4">
                            <h3 style={{ color: colors.textMuted }} className="text-xs font-bold uppercase tracking-wider mb-4 px-1">Administration</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                                                padding: '18px 24px',
                                                borderRadius: '9999px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                border: isActive ? `1.5px solid rgba(255, 255, 255, 0.4)` : `3px solid ${resolvedTheme === 'dark' ? '#0f172a' : '#cbd5e1'}`,
                                                background: isActive
                                                    ? `linear-gradient(180deg, ${tab.gradientFrom} 0%, ${tab.gradientTo} 100%)`
                                                    : `linear-gradient(180deg, ${resolvedTheme === 'dark' ? '#2d3748' : '#64748b'} 0%, ${resolvedTheme === 'dark' ? '#1a202c' : '#334155'} 100%)`,
                                                boxShadow: isActive
                                                    ? `0 6px 0 0 ${tab.shadow}, 0 12px 30px 0 ${tab.glow}`
                                                    : `0 4px 0 0 ${resolvedTheme === 'dark' ? '#0f172a' : '#1e293b'}, 0 6px 15px rgba(0, 0, 0, 0.2)`,
                                                color: '#ffffff',
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                overflow: 'hidden',
                                                transform: isActive ? 'translateY(2px)' : 'none',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = `0 6px 0 0 ${resolvedTheme === 'dark' ? '#0f172a' : '#1e293b'}, 0 12px 25px rgba(0, 0, 0, 0.3)`;
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.transform = 'none';
                                                    e.currentTarget.style.boxShadow = `0 4px 0 0 ${resolvedTheme === 'dark' ? '#0f172a' : '#1e293b'}, 0 6px 15px rgba(0, 0, 0, 0.2)`;
                                                }
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
                                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
                                                    borderRadius: '9999px 9999px 0 0',
                                                    pointerEvents: 'none',
                                                    borderTop: '1px solid rgba(255,255,255,0.4)',
                                                }}
                                            />

                                            {/* Button Content */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
                                                <Icon size={18} style={{ color: 'white', opacity: isActive ? 1 : 0.8 }} />
                                                <span style={{ fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '12px', color: 'white' }}>
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
                                    border: `1px solid ${colors.border} `,
                                    overflow: 'hidden',
                                    boxShadow: colors.shadow
                                }}>
                                    <div style={{
                                        padding: '24px 32px',
                                        borderBottom: `1px solid ${colors.border} `,
                                        background: 'linear-gradient(135deg, #0d1628 0%, #0f2044 50%, #0c253d 100%)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                backdropFilter: 'blur(10px)'
                                            }}>
                                                <User size={22} color="#60a5fa" />
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'white' }}>General Information</h3>
                                                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Basic details about your medical facility</p>
                                            </div>
                                        </div>
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
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <h4 style={{ color: colors.textPrimary }} className="text-sm font-semibold mb-4">Preferences</h4>
                                            <div style={{
                                                background: resolvedTheme === 'dark' ? '#0f172a' : '#f8fafc',
                                                padding: '16px 24px',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                border: `1.5px solid ${resolvedTheme === 'dark' ? '#1e293b' : '#e2e8f0'} `,
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                                            }}>
                                                <input
                                                    type="checkbox"
                                                    checked={notifications}
                                                    onChange={(e) => setNotifications(e.target.checked)}
                                                    style={{
                                                        appearance: 'none',
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '6px',
                                                        border: 'none',
                                                        background: notifications ? '#ef4444' : (resolvedTheme === 'dark' ? '#334155' : '#cbd5e1'),
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.2s',
                                                        boxShadow: notifications ? '0 0 10px rgba(239, 68, 68, 0.4)' : 'none'
                                                    }}
                                                />
                                                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ color: colors.textPrimary, fontSize: '14px', fontWeight: 700 }}>Email Notifications</span>
                                                    <span style={{ color: colors.textSecondary, fontSize: '13px' }}>Receive daily digests and critical alerts via email.</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-start pt-2">
                                            <button
                                                onClick={handleSave}
                                                style={{
                                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                                    color: 'white',
                                                    padding: '10px 20px',
                                                    borderRadius: '12px',
                                                    border: 'none',
                                                    fontWeight: 700,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.35)',
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
                                {/* Active Users Summary - Premium Grid Cards */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                    gap: '20px',
                                    marginBottom: '32px'
                                }}>
                                    {[
                                        { label: 'Total Users', value: '24', trend: '↑ 12%', trendLabel: 'this month', icon: Users, gradient: 'linear-gradient(135deg, #0d1628 0%, #1e3a8a 100%)', shadow: 'rgba(37, 99, 235, 0.3)' },
                                        { label: 'Active Now', value: '3', trend: 'Live', trendLabel: 'Online right now', icon: Activity, gradient: 'linear-gradient(135deg, #0f172a 0%, #065f46 100%)', shadow: 'rgba(5, 150, 105, 0.3)', isLive: true },
                                        { label: 'Avg. Session', value: '45m', trend: '↑ 8%', trendLabel: 'vs last week', icon: Clock, gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)', shadow: 'rgba(79, 70, 229, 0.3)' },
                                    ].map((stat, i) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div key={i} style={{
                                                background: stat.gradient,
                                                borderRadius: '20px',
                                                padding: '24px',
                                                color: 'white',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                boxShadow: `0 10px 25px - 5px ${stat.shadow} `,
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '12px'
                                            }}>
                                                {/* Decorative elements */}
                                                <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }}></div>
                                                <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.01em' }}>{stat.label}</span>
                                                    <div style={{
                                                        width: '36px', height: '36px', borderRadius: '10px',
                                                        background: 'rgba(255,255,255,0.12)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        backdropFilter: 'blur(8px)',
                                                        border: '1px solid rgba(255,255,255,0.15)'
                                                    }}>
                                                        <Icon size={18} color="white" />
                                                    </div>
                                                </div>

                                                <div style={{ position: 'relative', zIndex: 1 }}>
                                                    <h3 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px', lineHeight: 1 }}>{stat.value}</h3>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{
                                                            padding: '2px 8px', borderRadius: '50px',
                                                            background: 'rgba(255,255,255,0.15)',
                                                            fontSize: '11px', fontWeight: 700,
                                                            border: '1px solid rgba(255,255,255,0.1)'
                                                        }}>
                                                            {stat.isLive && <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', marginRight: '4px', animation: 'pulse 2s infinite' }}></span>}
                                                            {stat.trend}
                                                        </div>
                                                        <span style={{ fontSize: '11px', opacity: 0.7, fontWeight: 500 }}>{stat.trendLabel}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Login History Table - Premium Design */}
                                <div style={{
                                    background: colors.surface,
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: colors.shadow,
                                    border: `1px solid ${colors.border} `
                                }}>
                                    {/* Table Header */}
                                    <div style={{
                                        padding: '20px 24px',
                                        borderBottom: `1px solid ${colors.border} `,
                                        background: 'linear-gradient(135deg, #0d1628 0%, #0f2044 50%, #0c253d 100%)',
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
                                                <tr style={{ background: resolvedTheme === 'dark' ? 'rgba(15, 23, 42, 0.5)' : '#f9fafb' }}>
                                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User</th>
                                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</th>
                                                    <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loginHistory.map((log, index) => (
                                                    <tr
                                                        key={log.id}
                                                        style={{
                                                            background: index % 2 === 0 ? colors.surface : colors.inputBg,
                                                            borderBottom: `1px solid ${colors.border} `,
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
                                                                    ? (resolvedTheme === 'dark' ? 'rgba(37, 99, 235, 0.2)' : '#dbeafe')
                                                                    : log.role === 'Admin'
                                                                        ? (resolvedTheme === 'dark' ? 'rgba(20, 184, 166, 0.2)' : '#ccfbf1')
                                                                        : (resolvedTheme === 'dark' ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9'),
                                                                color: log.role === 'Doctor'
                                                                    ? (resolvedTheme === 'dark' ? '#60a5fa' : '#1d4ed8')
                                                                    : log.role === 'Admin'
                                                                        ? (resolvedTheme === 'dark' ? '#2dd4bf' : '#0d9488')
                                                                        : (resolvedTheme === 'dark' ? '#94a3b8' : '#64748b'),
                                                                border: log.role === 'Doctor'
                                                                    ? `1px solid ${resolvedTheme === 'dark' ? 'rgba(37, 99, 235, 0.3)' : '#bfdbfe'} `
                                                                    : log.role === 'Admin'
                                                                        ? `1px solid ${resolvedTheme === 'dark' ? 'rgba(20, 184, 166, 0.3)' : '#99f6e4'} `
                                                                        : `1px solid ${resolvedTheme === 'dark' ? '#334155' : '#e2e8f0'} `
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
                                        borderTop: `1px solid ${colors.border} `,
                                        background: resolvedTheme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
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
                                                border: `1px solid ${colors.border} `,
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
                                                border: `1px solid ${colors.border} `,
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
                                {/* Notification Stats Cards - Premium Redesign */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Enabled Notifications Count Card */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, #0d1628 0%, #0f2044 45%, #0c253d 100%)',
                                        borderRadius: '24px',
                                        padding: '32px',
                                        color: 'white',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(37,99,235,0.18)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                                    }}>
                                        {/* Decorative elements */}
                                        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', background: 'rgba(37, 99, 235, 0.15)', borderRadius: '50%', filter: 'blur(30px)' }}></div>
                                        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                            <div>
                                                <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Notifications</p>
                                                <h3 style={{ fontSize: '44px', fontWeight: 800, margin: 0, lineHeight: 1, letterSpacing: '-0.02em', color: 'white' }}>
                                                    {[emailNotifications, pushNotifications, appointmentReminders, billingAlerts, systemAlerts].filter(Boolean).length}
                                                </h3>
                                                <p style={{ fontSize: '13px', marginTop: '14px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>
                                                    of 5 notification types enabled
                                                </p>
                                            </div>
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)'
                                            }}>
                                                <Bell size={32} color="#60a5fa" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions Card - Premium Redesign */}
                                    <div style={{
                                        background: colors.surface,
                                        borderRadius: '24px',
                                        padding: '32px',
                                        border: `1px solid ${colors.border} `,
                                        boxShadow: colors.shadow,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <h4 style={{ margin: '0 0 20px', fontSize: '14px', fontWeight: 700, color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Actions</h4>
                                        <div style={{ display: 'flex', gap: '16px' }}>
                                            {[
                                                { label: 'Enable All', icon: CheckCircle, color: '#10b981', bg: 'linear-gradient(180deg, #10b981 0%, #059669 100%)', action: () => { setEmailNotifications(true); setPushNotifications(true); setAppointmentReminders(true); setBillingAlerts(true); setSystemAlerts(true); } },
                                                { label: 'Disable All', icon: AlertTriangle, color: '#ef4444', bg: 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)', action: () => { setEmailNotifications(false); setPushNotifications(false); setAppointmentReminders(false); setBillingAlerts(false); setSystemAlerts(false); } }
                                            ].map((btn, idx) => {
                                                const BtnIcon = btn.icon;
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={btn.action}
                                                        style={{
                                                            flex: 1,
                                                            padding: '16px',
                                                            borderRadius: '14px',
                                                            background: btn.bg,
                                                            color: 'white',
                                                            fontWeight: 700,
                                                            fontSize: '13px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '10px',
                                                            border: 'none',
                                                            boxShadow: `0 8px 20px - 6px ${btn.color} 80`,
                                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            position: 'relative',
                                                            overflow: 'hidden'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                                            e.currentTarget.style.boxShadow = `0 12px 24px - 6px ${btn.color} A0`;
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'translateY(0)';
                                                            e.currentTarget.style.boxShadow = `0 8px 20px - 6px ${btn.color} 80`;
                                                        }}
                                                    >
                                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}></div>
                                                        <BtnIcon size={18} style={{ position: 'relative', zIndex: 1 }} />
                                                        <span style={{ position: 'relative', zIndex: 1 }}>{btn.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Notification Preferences - Premium List */}
                                <div style={{
                                    background: colors.surface,
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: colors.shadow,
                                    border: `1px solid ${colors.border} `
                                }}>
                                    {/* Section Header - matches Admin & Users header style */}
                                    <div style={{
                                        padding: '24px 32px',
                                        borderBottom: `1px solid ${colors.border} `,
                                        background: 'linear-gradient(135deg, #0d1628 0%, #0f2044 50%, #0c253d 100%)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                backdropFilter: 'blur(10px)'
                                            }}>
                                                <Bell size={22} color="#60a5fa" />
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'white' }}>Notification Preferences</h3>
                                                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Personalize your alert delivery methods</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preference Items */}
                                    <div style={{ padding: '16px' }} className="space-y-4">
                                        {[
                                            { id: 'email', label: 'Email Notifications', desc: 'Receive updates and alerts via email', val: emailNotifications, set: setEmailNotifications, icon: Mail, color: '#c084fc' },
                                            { id: 'push', label: 'Push Notifications', desc: 'Get instant alerts on your device', val: pushNotifications, set: setPushNotifications, icon: Smartphone, color: '#3b82f6' },
                                            { id: 'appointment', label: 'Appointment Reminders', desc: 'Alerts for upcoming patient visits', val: appointmentReminders, set: setAppointmentReminders, icon: Clock, color: '#10b981' },
                                            { id: 'billing', label: 'Billing Alerts', desc: 'Notifications for invoices and payments', val: billingAlerts, set: setBillingAlerts, icon: IndianRupee, color: '#f59e0b' },
                                            { id: 'system', label: 'System Alerts', desc: 'Critical infrastructure and security updates', val: systemAlerts, set: setSystemAlerts, icon: Shield, color: '#ef4444' }
                                        ].map((item) => {
                                            const ItemIcon = item.icon;
                                            return (
                                                <div
                                                    key={item.id}
                                                    onClick={() => item.set(!item.val)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        padding: '20px 24px',
                                                        borderRadius: '16px',
                                                        background: item.val ? (resolvedTheme === 'dark' ? 'rgba(37, 99, 235, 0.05)' : '#f8fafc') : 'transparent',
                                                        border: item.val ? `1px solid ${colors.textPrimary} 40` : `1px solid ${colors.border} `,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        transform: item.val ? 'scale(1.005)' : 'scale(1)',
                                                        boxShadow: item.val ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.borderColor = colors.textPrimary + '80';
                                                        e.currentTarget.style.background = resolvedTheme === 'dark' ? 'rgba(255,255,255,0.03)' : '#f1f5f9';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.borderColor = item.val ? colors.textPrimary + '40' : colors.border;
                                                        e.currentTarget.style.background = item.val ? (resolvedTheme === 'dark' ? 'rgba(37, 99, 235, 0.05)' : '#f8fafc') : 'transparent';
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                        <div style={{
                                                            width: '52px',
                                                            height: '52px',
                                                            borderRadius: '14px',
                                                            background: `linear - gradient(135deg, ${item.color}20 0 %, ${item.color}40 100 %)`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: `1px solid ${item.color} 30`,
                                                            boxShadow: `0 8px 16px ${item.color} 15`
                                                        }}>
                                                            <ItemIcon size={24} color={item.color} />
                                                        </div>
                                                        <div>
                                                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: colors.textPrimary }}>{item.label}</h4>
                                                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSecondary, fontWeight: 500 }}>{item.desc}</p>
                                                        </div>
                                                    </div>

                                                    {/* Custom iOS-style Toggle */}
                                                    <div style={{
                                                        width: '52px',
                                                        height: '28px',
                                                        borderRadius: '14px',
                                                        background: item.val ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : (resolvedTheme === 'dark' ? '#1f2937' : '#e2e8f0'),
                                                        position: 'relative',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        boxShadow: item.val ? '0 4px 12px rgba(37, 99, 235, 0.4)' : 'inset 0 2px 4px rgba(0,0,0,0.1)',
                                                        border: '1px solid rgba(255,255,255,0.1)'
                                                    }}>
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '2px',
                                                            left: item.val ? '24px' : '2px',
                                                            width: '22px',
                                                            height: '22px',
                                                            borderRadius: '50%',
                                                            background: 'white',
                                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Action Footer */}
                                    <div style={{
                                        padding: '24px 32px',
                                        background: resolvedTheme === 'dark' ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                                        borderTop: `1px solid ${colors.border} `,
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <button
                                            onClick={handleSave}
                                            style={{
                                                padding: '14px 28px',
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                                color: 'white',
                                                fontWeight: 800,
                                                fontSize: '14px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                border: 'none',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                boxShadow: '0 8px 25px -5px rgba(37, 99, 235, 0.5)',
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}></div>
                                            <Save size={18} style={{ position: 'relative', zIndex: 1 }} />
                                            <span style={{ position: 'relative', zIndex: 1 }}>Save Preferences</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6 animate-fade-in">

                                <div style={{
                                    background: colors.surface,
                                    borderRadius: '16px',
                                    border: `1px solid ${colors.border} `,
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
                                    border: `1px solid ${colors.border} `,
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
                                                        background: colors.inputBg,
                                                        color: colors.textPrimary,
                                                        border: `1.5px solid ${colors.border} `,
                                                        padding: '12px 16px',
                                                        borderRadius: '10px',
                                                        outline: 'none',
                                                        fontSize: '14px',
                                                        appearance: 'none',
                                                        cursor: 'pointer',
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
                                    border: `1px solid ${colors.border} `,
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
                                                <label style={{ color: colors.textPrimary, fontSize: '13px', fontWeight: 600 }}>Current Password</label>
                                                <Input
                                                    type="password"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    fullWidth
                                                    placeholder="Enter current password"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label style={{ color: colors.textPrimary, fontSize: '13px', fontWeight: 600 }}>New Password</label>
                                                <Input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    fullWidth
                                                    placeholder="Enter new password"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label style={{ color: colors.textPrimary, fontSize: '13px', fontWeight: 600 }}>Confirm Password</label>
                                                <Input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    fullWidth
                                                    placeholder="Confirm new password"
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
