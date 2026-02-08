import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Calendar,
    Activity,
    Sparkles,
    FileText,
    Info,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
    Monitor
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';

const Sidebar = () => {
    const location = useLocation();
    const { theme, setTheme } = useHospital();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { label: 'Patients', icon: Users, path: '/patients' },
        { label: 'Doctors', icon: Stethoscope, path: '/doctors' },
        { label: 'Appointments', icon: Calendar, path: '/appointments' },
        { label: 'AI Prescription', icon: Sparkles, path: '/ai-prescription' },
        { label: 'Billing', icon: FileText, path: '/billing' },
        { label: 'Guide', icon: Info, path: '/guide' },
    ];

    // Sidebar container styles
    const sidebarStyle: React.CSSProperties = {
        width: isCollapsed ? '80px' : '260px',
        height: '100vh',
        background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
    };

    // Header styles
    const headerStyle: React.CSSProperties = {
        padding: isCollapsed ? '20px 16px' : '24px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
    };

    // Brand styles
    const brandStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: 'white',
        textDecoration: 'none',
    };

    // Nav styles
    const navStyle: React.CSSProperties = {
        flex: 1,
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        overflowY: 'auto',
    };

    // Get nav item styles
    const getNavItemStyle = (path: string): React.CSSProperties => {
        const isActive = location.pathname === path;
        const isHovered = hoveredItem === path;

        return {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: isCollapsed ? '14px' : '14px 16px',
            borderRadius: '12px',
            color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            background: isActive
                ? 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)'
                : isHovered
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent',
            boxShadow: isActive ? '0 4px 15px rgba(147, 51, 234, 0.4)' : 'none',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            position: 'relative',
            overflow: 'hidden',
        };
    };



    // Collapse button styles
    const collapseButtonStyle: React.CSSProperties = {
        position: 'absolute',
        right: '-12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: 'white',
        border: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#4c1d95',
        transition: 'all 0.2s',
        zIndex: 10,
    };

    return (
        <aside style={sidebarStyle}>
            {/* Collapse Button */}
            <button
                style={collapseButtonStyle}
                onClick={() => setIsCollapsed(!isCollapsed)}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Header */}
            <div style={headerStyle}>
                <Link to="/" style={brandStyle}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4)',
                    }}>
                        <Activity size={22} color="white" />
                    </div>
                    {!isCollapsed && (
                        <span style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #c084fc 0%, #f0abfc 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            MediCare
                        </span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav style={navStyle}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={getNavItemStyle(item.path)}
                            onMouseEnter={() => setHoveredItem(item.path)}
                            onMouseLeave={() => setHoveredItem(null)}
                            title={isCollapsed ? item.label : undefined}
                        >
                            {/* Active indicator */}
                            {isActive && (
                                <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '4px',
                                    height: '60%',
                                    background: 'white',
                                    borderRadius: '0 4px 4px 0',
                                    display: isCollapsed ? 'none' : 'block',
                                }} />
                            )}
                            <Icon size={20} />
                            {!isCollapsed && (
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: isActive ? 600 : 500,
                                }}>
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Theme Switcher (Bottom) */}
            <div style={{
                marginTop: 'auto',
                padding: '16px',
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                    {[
                        { id: 'light', icon: Sun, label: 'Light' },
                        { id: 'system', icon: Monitor, label: 'System' },
                        { id: 'dark', icon: Moon, label: 'Dark' },
                    ].map((t) => {
                        const Icon = t.icon;
                        const isActive = theme === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id as 'light' | 'dark' | 'system')}
                                title={isCollapsed ? t.label : undefined}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: isActive ? 'white' : 'transparent',
                                    color: isActive ? '#4f46e5' : 'rgba(255, 255, 255, 0.6)',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease',
                                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                                }}
                            >
                                <Icon size={18} />
                                {!isCollapsed && (
                                    <span style={{
                                        marginLeft: '8px',
                                        fontSize: '12px',
                                        fontWeight: 600
                                    }}>
                                        {t.label}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
