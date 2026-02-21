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
    Monitor,
    Bed
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Patients', icon: Users, path: '/patients' },
    { label: 'Doctors', icon: Stethoscope, path: '/doctors' },
    { label: 'Appointments', icon: Calendar, path: '/appointments' },
    { label: 'Ward Management', icon: Bed, path: '/wards' },
    { label: 'AI Prescription', icon: Sparkles, path: '/ai-prescription' },
    { label: 'Billing', icon: FileText, path: '/billing' },
    { label: 'Guide', icon: Info, path: '/guide' },
];

const THEME_OPTIONS = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'system', icon: Monitor, label: 'System' },
    { id: 'dark', icon: Moon, label: 'Dark' },
] as const;

const Sidebar = () => {
    const location = useLocation();
    const { theme, setTheme } = useHospital();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const sidebarBg = 'linear-gradient(180deg, #0d1628 0%, #111f36 60%, #0c1a30 100%)';

    const sidebarStyle: React.CSSProperties = {
        width: isCollapsed ? '72px' : '256px',
        height: '100vh',
        background: sidebarBg,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        boxShadow: '4px 0 32px rgba(0,0,0,0.25), 1px 0 0 rgba(255,255,255,0.04)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        overflowX: 'hidden',
    };

    const headerStyle: React.CSSProperties = {
        padding: isCollapsed ? '20px 0' : '22px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        flexShrink: 0,
    };

    const getNavItemStyle = (path: string): React.CSSProperties => {
        const isActive = location.pathname === path;
        const isHovered = hoveredItem === path;
        return {
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            padding: isCollapsed ? '13px 0' : '12px 14px',
            borderRadius: '12px',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
            textDecoration: 'none',
            transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
            background: isActive
                ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                : isHovered
                    ? 'rgba(37,99,235,0.12)'
                    : 'transparent',
            boxShadow: isActive ? '0 4px 16px rgba(37,99,235,0.35)' : 'none',
            position: 'relative',
            overflow: 'hidden',
        };
    };

    const collapseButtonStyle: React.CSSProperties = {
        position: 'absolute',
        right: '-13px',
        top: '72px',
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        background: 'white',
        border: '2px solid rgba(37,99,235,0.2)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2563eb',
        transition: 'all 0.2s',
        zIndex: 10,
    };

    return (
        <aside style={sidebarStyle}>
            {/* Collapse button */}
            <button
                style={collapseButtonStyle}
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'; }}
            >
                {isCollapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
            </button>

            {/* Brand header */}
            <div style={headerStyle}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '11px', textDecoration: 'none' }}>
                    <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '11px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(37,99,235,0.45)',
                        flexShrink: 0,
                    }}>
                        <Activity size={20} color="white" />
                    </div>
                    {!isCollapsed && (
                        <span style={{
                            fontSize: '19px',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            color: 'white',
                            whiteSpace: 'nowrap',
                        }}>
                            Medi<span style={{ color: '#60a5fa' }}>Care</span>
                        </span>
                    )}
                </Link>
            </div>

            {/* Nav section label */}
            {!isCollapsed && (
                <div style={{
                    padding: '16px 20px 6px',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.25)',
                    flexShrink: 0,
                }}>
                    Navigation
                </div>
            )}

            {/* Navigation links */}
            <nav
                role="navigation"
                aria-label="Main navigation"
                style={{
                    flex: 1,
                    padding: isCollapsed ? '12px 8px' : '8px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollbarWidth: 'none',
                }}
            >
                {NAV_ITEMS.map((item) => {
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
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {/* Active left bar */}
                            {isActive && !isCollapsed && (
                                <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '25%',
                                    height: '50%',
                                    width: '3px',
                                    background: 'rgba(255,255,255,0.9)',
                                    borderRadius: '0 3px 3px 0',
                                }} />
                            )}
                            <Icon size={19} />
                            {!isCollapsed && (
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: isActive ? 600 : 500,
                                    whiteSpace: 'nowrap',
                                    letterSpacing: '0.005em',
                                }}>
                                    {item.label}
                                </span>
                            )}
                            {/* AI badge for AI Prescription */}
                            {!isCollapsed && item.path === '/ai-prescription' && (
                                <span style={{
                                    marginLeft: 'auto',
                                    fontSize: '9px',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    padding: '2px 6px',
                                    borderRadius: '50px',
                                    background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                                    color: 'white',
                                    boxShadow: '0 2px 6px rgba(20,184,166,0.4)',
                                }}>
                                    AI
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Theme Switcher */}
            <div style={{
                padding: isCollapsed ? '12px 8px' : '12px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
            }}>
                {!isCollapsed && (
                    <p style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.25)',
                        margin: '0 0 8px 2px',
                    }}>
                        Appearance
                    </p>
                )}
                <div style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '10px',
                    padding: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.08)',
                    gap: '2px',
                }}>
                    {THEME_OPTIONS.map((t) => {
                        const Icon = t.icon;
                        const isActive = theme === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id as 'light' | 'dark' | 'system')}
                                title={t.label}
                                aria-pressed={isActive}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: isActive
                                        ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                                        : 'transparent',
                                    color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                                    borderRadius: '7px',
                                    padding: '7px 4px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '5px',
                                    transition: 'all 0.22s',
                                    boxShadow: isActive ? '0 2px 8px rgba(37,99,235,0.4)' : 'none',
                                    fontFamily: 'inherit',
                                }}
                            >
                                <Icon size={14} />
                                {!isCollapsed && (
                                    <span style={{ fontSize: '11px', fontWeight: 600 }}>{t.label}</span>
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
