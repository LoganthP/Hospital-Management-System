import React from 'react';

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
    // Gradient and style configurations for each variant
    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 15px rgba(217, 70, 239, 0.4)',
        },
        secondary: {
            background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 15px rgba(107, 114, 128, 0.3)',
        },
        success: {
            background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 15px rgba(5, 150, 105, 0.4)',
        },
        danger: {
            background: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
        },
        ghost: {
            background: 'transparent',
            color: '#6b7280',
            border: '2px solid #e5e7eb',
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
        ...variantStyles[variant],
        ...sizeStyles[size],
    };

    // Hover effect handler
    const [isHovered, setIsHovered] = React.useState(false);

    const hoverStyle: React.CSSProperties = isHovered && !disabled && !isLoading ? {
        transform: 'translateY(-2px)',
        boxShadow: variant === 'ghost'
            ? '0 4px 12px rgba(0, 0, 0, 0.1)'
            : variant === 'primary'
                ? '0 8px 25px rgba(147, 51, 234, 0.5)'
                : variant === 'success'
                    ? '0 8px 25px rgba(5, 150, 105, 0.5)'
                    : variant === 'danger'
                        ? '0 8px 25px rgba(220, 38, 38, 0.5)'
                        : '0 8px 25px rgba(107, 114, 128, 0.4)',
        ...(variant === 'ghost' && { background: '#f3f4f6', borderColor: '#d1d5db' }),
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
