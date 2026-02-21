import React, { useState, useId, type InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    leftIcon?: LucideIcon;
    error?: string;
    hint?: string;
    showPasswordToggle?: boolean;
}

const AuthInputField: React.FC<AuthInputFieldProps> = ({
    label,
    leftIcon: LeftIcon,
    error,
    hint,
    showPasswordToggle = false,
    type = 'text',
    value,
    onChange,
    required,
    ...props
}) => {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const hasValue = value !== undefined && value !== '';
    const isFloating = isFocused || hasValue;
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        marginBottom: error ? '4px' : '0',
    };

    const wrapperStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.07)',
        border: `1.5px solid ${error ? 'rgba(239,68,68,0.7)' : isFocused ? 'rgba(37,99,235,0.8)' : 'rgba(255,255,255,0.15)'}`,
        borderRadius: '14px',
        transition: 'all 0.25s ease',
        boxShadow: isFocused
            ? error
                ? '0 0 0 3px rgba(239,68,68,0.12), 0 2px 8px rgba(0,0,0,0.12)'
                : '0 0 0 3px rgba(37,99,235,0.15), 0 2px 8px rgba(0,0,0,0.12)'
            : '0 1px 3px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(8px)',
    };

    const labelStyle: React.CSSProperties = {
        position: 'absolute',
        left: LeftIcon ? '44px' : '16px',
        top: isFloating ? '8px' : '50%',
        transform: isFloating ? 'translateY(0) scale(0.78)' : 'translateY(-50%)',
        transformOrigin: 'left center',
        fontSize: isFloating ? '11px' : '14px',
        fontWeight: 600,
        color: error
            ? 'rgba(239,68,68,0.9)'
            : isFocused
                ? 'rgba(96,165,250,1)'
                : 'rgba(255,255,255,0.5)',
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: 'none',
        letterSpacing: isFloating ? '0.04em' : '0',
        zIndex: 2,
        whiteSpace: 'nowrap',
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        paddingTop: isFloating ? '22px' : '14px',
        paddingBottom: isFloating ? '8px' : '14px',
        paddingLeft: LeftIcon ? '44px' : '16px',
        paddingRight: showPasswordToggle ? '48px' : '16px',
        fontSize: '15px',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.95)',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        fontFamily: 'inherit',
        caretColor: '#60a5fa',
        transition: 'padding 0.22s',
    };

    const leftIconStyle: React.CSSProperties = {
        position: 'absolute',
        left: '14px',
        color: isFocused ? 'rgba(96,165,250,0.9)' : 'rgba(255,255,255,0.35)',
        transition: 'color 0.22s',
        flexShrink: 0,
        zIndex: 2,
        pointerEvents: 'none',
        top: '50%',
        transform: 'translateY(-50%)',
    };

    const toggleStyle: React.CSSProperties = {
        position: 'absolute',
        right: '14px',
        color: 'rgba(255,255,255,0.4)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        borderRadius: '6px',
        transition: 'color 0.2s',
        zIndex: 2,
        top: '50%',
        transform: 'translateY(-50%)',
    };

    return (
        <div style={containerStyle}>
            <div style={wrapperStyle}>
                {LeftIcon && (
                    <LeftIcon size={18} style={leftIconStyle} aria-hidden="true" />
                )}
                <label htmlFor={id} style={labelStyle}>
                    {label}{required && <span style={{ color: 'rgba(248,113,113,0.8)', marginLeft: '2px' }}>*</span>}
                </label>
                <input
                    id={id}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    style={inputStyle}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    aria-label={label}
                    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                    aria-invalid={!!error}
                    required={required}
                    {...props}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        style={toggleStyle}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword
                            ? <EyeOff size={18} />
                            : <Eye size={18} />
                        }
                    </button>
                )}
            </div>

            {error && (
                <p
                    id={`${id}-error`}
                    role="alert"
                    style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'rgba(248,113,113,0.95)',
                        marginTop: '6px',
                        marginLeft: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                >
                    <span aria-hidden="true">⚠</span> {error}
                </p>
            )}
            {hint && !error && (
                <p
                    id={`${id}-hint`}
                    style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.35)',
                        marginTop: '5px',
                        marginLeft: '4px',
                    }}
                >
                    {hint}
                </p>
            )}
        </div>
    );
};

export default AuthInputField;
