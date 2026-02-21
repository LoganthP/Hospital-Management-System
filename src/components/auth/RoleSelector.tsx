import React from 'react';
import { ShieldCheck, Stethoscope, Heart, User2 } from 'lucide-react';

type Role = 'Admin' | 'Doctor' | 'Nurse' | 'Patient';

interface RoleSelectorProps {
    selected: Role;
    onChange: (role: Role) => void;
}

const ROLES: { value: Role; label: string; icon: React.ElementType; color: string; bg: string }[] = [
    { value: 'Admin', label: 'Admin', icon: ShieldCheck, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    { value: 'Doctor', label: 'Doctor', icon: Stethoscope, color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
    { value: 'Nurse', label: 'Nurse', icon: Heart, color: '#f472b6', bg: 'rgba(244,114,182,0.12)' },
    { value: 'Patient', label: 'Patient', icon: User2, color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
];

const RoleSelector: React.FC<RoleSelectorProps> = ({ selected, onChange }) => {
    return (
        <div>
            <p style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '10px',
            }}>
                Account Type
            </p>
            <div
                role="radiogroup"
                aria-label="Select account type"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                }}
            >
                {ROLES.map(({ value, label, icon: Icon, color, bg }) => {
                    const isSelected = selected === value;
                    return (
                        <button
                            key={value}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => onChange(value)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 12px',
                                borderRadius: '12px',
                                border: `1.5px solid ${isSelected ? color : 'rgba(255,255,255,0.1)'}`,
                                background: isSelected ? bg : 'rgba(255,255,255,0.04)',
                                color: isSelected ? color : 'rgba(255,255,255,0.5)',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                                fontFamily: 'inherit',
                                boxShadow: isSelected ? `0 4px 12px ${color}22` : 'none',
                                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                            }}
                        >
                            <Icon size={15} aria-hidden="true" />
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RoleSelector;
