import React from 'react';
import { useHospital } from '../context/HospitalContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    className = '',
    disabled,
    fullWidth,
    style = {},
    ...props
}) => {
    const { colors, resolvedTheme } = useHospital();

    // Gradient and style configurations for each variant — Medical Blue Theme
    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.45)',
        },
        secondary: {
            background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
            color: 'white',
            border: 'none',
            boxShadow: resolvedTheme === 'dark' ? '0 4px 15px rgba(0, 0, 0, 0.3)' : '0 4px 15px rgba(100, 116, 139, 0.2)',
        },
        success: {
            background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 15px rgba(13, 148, 136, 0.4)',
        },
        danger: {
            background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
        },
        ghost: {
            background: 'transparent',
            color: colors.textSecondary,
            border: `2px solid ${colors.border}`,
            boxShadow: 'none',
        },
    };

    // Size configurations
    const sizeStyles: Record<string, React.CSSProperties> = {
        sm: {
            padding: '8px 16px',
            fontSize: '13px',
            borderRadius: '8px',
        },
        md: {
            padding: '12px 24px',
            fontSize: '14px',
            borderRadius: '10px',
        },
        lg: {
            padding: '16px 32px',
            fontSize: '16px',
            borderRadius: '12px',
        },
    };

    const baseStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 600,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        opacity: disabled || isLoading ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'inherit',
        outline: 'none',
        position: 'relative',
        ...variantStyles[variant],
        ...sizeStyles[size],
    };

    // Hover effect handler
    const [isHovered, setIsHovered] = React.useState(false);

    const hoverStyle: React.CSSProperties = isHovered && !disabled && !isLoading ? {
        transform: 'translateY(-2px)',
        boxShadow: variant === 'ghost'
            ? colors.shadow
            : variant === 'primary'
                ? '0 8px 30px rgba(37, 99, 235, 0.6)'
                : variant === 'success'
                    ? '0 8px 30px rgba(13, 148, 136, 0.6)'
                    : variant === 'danger'
                        ? '0 8px 30px rgba(220, 38, 38, 0.6)'
                        : '0 8px 30px rgba(0, 0, 0, 0.4)',
        ...(variant === 'ghost' && { background: colors.surfaceHover, borderColor: colors.textMuted }),
    } : {};

    return (
        <button
            className={className}
            disabled={disabled || isLoading}
            style={{ ...baseStyle, ...hoverStyle, ...style, overflow: 'hidden' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Glossy Overlay for Premium Look */}
            {variant !== 'ghost' && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                        pointerEvents: 'none',
                    }}
                />
            )}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isLoading ? (
                    <>
                        <svg
                            style={{ animation: 'spin 1s linear infinite' }}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="31.416"
                                strokeDashoffset="10"
                            />
                        </svg>
                        Loading...
                    </>
                ) : children}
            </div>
        </button>
    );
};

export default Button;
