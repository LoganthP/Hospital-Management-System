import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
    icon?: LucideIcon;
    variant?: 'default' | 'gradient' | 'glass';
    gradientColors?: string;
    noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    title,
    subtitle,
    action,
    icon: Icon,
    variant = 'default',
    gradientColors,
    noPadding = false,
}) => {
    const { resolvedTheme } = useHospital();
    const [isHovered, setIsHovered] = React.useState(false);

    // Determine if dark mode is active
    const isDark = resolvedTheme === 'dark';

    // Colors based on theme
    const colors = {
        surface: isDark ? '#1e293b' : 'white',
        surfaceHover: isDark ? '#334155' : '#f3f4f6',
        border: isDark ? '#334155' : '#e5e7eb',
        borderHeader: isDark ? '#475569' : '#f3f4f6',
        textPrimary: isDark ? '#f8fafc' : '#111827',
        textSecondary: isDark ? '#94a3b8' : '#6b7280',
        glassBg: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        iconBg: isDark ? 'linear-gradient(135deg, #312e81 0%, #4c1d95 100%)' : 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
    };

    // Base card styles
    const baseStyle: React.CSSProperties = {
        background: variant === 'gradient'
            ? (gradientColors || 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)')
            : variant === 'glass'
                ? colors.glassBg
                : colors.surface,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isHovered
            ? isDark
                ? '0 20px 40px -12px rgba(0, 0, 0, 0.4)'
                : '0 20px 40px -12px rgba(0, 0, 0, 0.15)'
            : isDark
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: variant === 'glass'
            ? `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`
            : `1px solid ${colors.border}`,
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        backdropFilter: variant === 'glass' ? 'blur(12px)' : 'none',
    };

    // Header styles for gradient variant
    const headerStyle: React.CSSProperties = variant === 'gradient' ? {
        padding: '20px 24px',
        color: 'white',
    } : {
        padding: '20px 24px',
        borderBottom: (title || action) ? `1px solid ${colors.borderHeader}` : 'none',
    };

    // Content padding
    const contentStyle: React.CSSProperties = {
        padding: noPadding ? '0' : '24px',
    };

    return (
        <div
            className={className}
            style={baseStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {(title || action || Icon) && (
                <div style={{
                    ...headerStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {Icon && (
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: variant === 'gradient'
                                    ? 'rgba(255, 255, 255, 0.2)'
                                    : colors.iconBg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Icon
                                    size={20}
                                    color={variant === 'gradient' ? 'white' : '#9333ea'}
                                />
                            </div>
                        )}
                        <div>
                            {title && (
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    color: variant === 'gradient' ? 'white' : colors.textPrimary,
                                }}>
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p style={{
                                    margin: '4px 0 0',
                                    fontSize: '13px',
                                    color: variant === 'gradient' ? 'rgba(255,255,255,0.8)' : colors.textSecondary,
                                }}>
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    );
};

export default Card;

