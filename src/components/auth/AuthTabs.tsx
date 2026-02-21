import React from 'react';

type Tab = 'signin' | 'signup';

interface AuthTabsProps {
    activeTab: Tab;
    onChange: (tab: Tab) => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onChange }) => {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '50px',
        padding: '4px',
        gap: '0',
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.1)',
    };

    const tabStyle = (isActive: boolean): React.CSSProperties => ({
        flex: 1,
        padding: '10px 20px',
        borderRadius: '50px',
        border: 'none',
        background: isActive
            ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
            : 'transparent',
        color: isActive ? 'white' : 'rgba(255,255,255,0.45)',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        letterSpacing: '0.01em',
        boxShadow: isActive ? '0 4px 14px rgba(37,99,235,0.4)' : 'none',
        fontFamily: 'inherit',
        position: 'relative',
        zIndex: 1,
    });

    return (
        <div
            role="tablist"
            aria-label="Authentication mode"
            style={containerStyle}
        >
            <button
                role="tab"
                aria-selected={activeTab === 'signin'}
                aria-controls="signin-panel"
                id="signin-tab"
                onClick={() => onChange('signin')}
                style={tabStyle(activeTab === 'signin')}
            >
                Sign In
            </button>
            <button
                role="tab"
                aria-selected={activeTab === 'signup'}
                aria-controls="signup-panel"
                id="signup-tab"
                onClick={() => onChange('signup')}
                style={tabStyle(activeTab === 'signup')}
            >
                Sign Up
            </button>
        </div>
    );
};

export default AuthTabs;
