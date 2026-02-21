import React, { useState, type InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: string;
    fullWidth?: boolean;
    containerClassName?: string;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    success,
    fullWidth,
    className = '',
    containerClassName = '',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    style = {},
    ...props
}) => {
    const { colors } = useHospital();
    const [isFocused, setIsFocused] = useState(false);

    // Container styles
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        width: fullWidth ? '100%' : 'auto',
    };

    // Label styles
    const labelStyle: React.CSSProperties = {
        fontSize: '14px',
        fontWeight: 600,
        color: colors.textPrimary,
        marginBottom: '4px',
    };

    // Input wrapper styles (for icons)
    const wrapperStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    };

    // Input base styles — uses theme-aware colors
    const inputBaseStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px 16px',
        paddingLeft: LeftIcon ? '44px' : '16px',
        paddingRight: RightIcon ? '44px' : '16px',
        fontSize: '14px',
        fontFamily: 'inherit',
        color: colors.textPrimary,
        background: colors.inputBg,
        border: '1.5px solid',
        borderColor: error
            ? '#f87171'
            : success
                ? '#34d399'
                : isFocused
                    ? '#2563eb'
                    : colors.border,
        borderRadius: '10px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxShadow: isFocused
            ? error
                ? '0 0 0 3px rgba(248, 113, 113, 0.1)'
                : success
                    ? '0 0 0 3px rgba(52, 211, 153, 0.1)'
                    : '0 0 0 3px rgba(37, 99, 235, 0.15)'
            : '0 1px 2px rgba(0,0,0,0.05)',
        ...style
    };

    // Icon styles
    const iconStyle: React.CSSProperties = {
        position: 'absolute',
        color: isFocused ? '#2563eb' : colors.textMuted,
        transition: 'color 0.2s ease',
        pointerEvents: 'none',
    };

    // Error/Success message styles
    const messageStyle: React.CSSProperties = {
        fontSize: '12px',
        fontWeight: 500,
        marginTop: '4px',
    };

    return (
        <div className={containerClassName} style={containerStyle}>
            {label && <label style={labelStyle}>{label}</label>}
            <div style={wrapperStyle}>
                {LeftIcon && (
                    <LeftIcon
                        size={18}
                        style={{ ...iconStyle, left: '14px' }}
                    />
                )}
                <input
                    className={className}
                    style={inputBaseStyle}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                    {...props}
                />
                {RightIcon && (
                    <RightIcon
                        size={18}
                        style={{ ...iconStyle, right: '14px' }}
                    />
                )}
            </div>
            {error && (
                <span style={{ ...messageStyle, color: '#dc2626' }}>
                    {error}
                </span>
            )}
            {success && !error && (
                <span style={{ ...messageStyle, color: '#059669' }}>
                    {success}
                </span>
            )}
        </div>
    );
};

export default Input;
