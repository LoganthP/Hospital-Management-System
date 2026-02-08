import React, { useState, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    error?: string;
    fullWidth?: boolean;
    containerClassName?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    options,
    error,
    fullWidth,
    className = '',
    containerClassName = '',
    ...props
}) => {
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
        fontWeight: 500,
        color: '#374151',
        marginBottom: '2px',
    };

    // Select wrapper styles
    const wrapperStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    };

    // Select styles
    const selectStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px 44px 12px 16px',
        fontSize: '14px',
        fontFamily: 'inherit',
        color: '#111827',
        background: isFocused ? 'white' : '#f9fafb',
        border: '2px solid',
        borderColor: error
            ? '#f87171'
            : isFocused
                ? '#9333ea'
                : '#e5e7eb',
        borderRadius: '10px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxShadow: isFocused
            ? error
                ? '0 0 0 3px rgba(248, 113, 113, 0.2)'
                : '0 0 0 3px rgba(147, 51, 234, 0.15)'
            : 'none',
        appearance: 'none',
        cursor: 'pointer',
    };

    // Chevron icon styles
    const chevronStyle: React.CSSProperties = {
        position: 'absolute',
        right: '14px',
        color: isFocused ? '#9333ea' : '#9ca3af',
        transition: 'all 0.2s ease',
        transform: isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
        pointerEvents: 'none',
    };

    // Error message styles
    const errorStyle: React.CSSProperties = {
        fontSize: '12px',
        fontWeight: 500,
        marginTop: '4px',
        color: '#dc2626',
    };

    return (
        <div className={containerClassName} style={containerStyle}>
            {label && <label style={labelStyle}>{label}</label>}
            <div style={wrapperStyle}>
                <select
                    className={className}
                    style={selectStyle}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                    {...props}
                >
                    <option value="" disabled>Select an option</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={18}
                    style={chevronStyle}
                />
            </div>
            {error && <span style={errorStyle}>{error}</span>}
        </div>
    );
};

export default Select;
