import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import type { WardType, AccommodationType } from '../../services/wardData';
import { Filter, Building2, User2 } from 'lucide-react';

interface WardFilterPanelProps {
    selectedWards: WardType[];
    setSelectedWards: (wards: WardType[]) => void;
    selectedAccommodations: AccommodationType[];
    setSelectedAccommodations: (accommodations: AccommodationType[]) => void;
}

const WARD_CATEGORIES: { label: WardType; icon: any }[] = [
    { label: 'ICU', icon: Building2 },
    { label: 'Medical Ward', icon: Building2 },
    { label: 'Surgical Ward', icon: Building2 },
    { label: 'Emergency', icon: Building2 },
    { label: 'Maternity', icon: Building2 },
    { label: 'Pediatric', icon: Building2 },
    { label: 'Geriatric', icon: Building2 },
    { label: 'Oncology', icon: Building2 },
    { label: 'Rehabilitation', icon: Building2 },
];

const ACCOMMODATIONS: AccommodationType[] = ['General', 'Private', 'Semi-Private', 'Day Unit'];

const WardFilterPanel: React.FC<WardFilterPanelProps> = ({
    selectedWards,
    setSelectedWards,
    selectedAccommodations,
    setSelectedAccommodations,
}) => {
    const { colors, resolvedTheme } = useHospital();
    const isDark = resolvedTheme === 'dark';

    const toggleWard = (ward: WardType) => {
        if (selectedWards.includes(ward)) {
            setSelectedWards(selectedWards.filter(w => w !== ward));
        } else {
            setSelectedWards([...selectedWards, ward]);
        }
    };

    const toggleAccommodation = (acc: AccommodationType) => {
        if (selectedAccommodations.includes(acc)) {
            setSelectedAccommodations(selectedAccommodations.filter(a => a !== acc));
        } else {
            setSelectedAccommodations([...selectedAccommodations, acc]);
        }
    };

    const panelStyle: React.CSSProperties = {
        background: colors.surface,
        borderRadius: '20px',
        padding: '24px',
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadow,
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minWidth: '280px',
    };

    const sectionTitleStyle: React.CSSProperties = {
        fontSize: '14px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: colors.textSecondary,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
    };

    const pillStyle = (isActive: boolean): React.CSSProperties => ({
        padding: '8px 12px',
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid',
        borderColor: isActive ? '#2563eb' : colors.border,
        background: isActive ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
        color: isActive ? '#2563eb' : colors.textSecondary,
    });

    return (
        <div style={panelStyle}>
            <div>
                <div style={sectionTitleStyle}>
                    <Filter size={16} />
                    Ward Categories
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {WARD_CATEGORIES.map((ward) => (
                        <div
                            key={ward.label}
                            style={pillStyle(selectedWards.includes(ward.label))}
                            onClick={() => toggleWard(ward.label)}
                        >
                            <ward.icon size={14} />
                            {ward.label}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '24px' }}>
                <div style={sectionTitleStyle}>
                    <User2 size={16} />
                    Accommodation
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {ACCOMMODATIONS.map((acc) => (
                        <div
                            key={acc}
                            style={pillStyle(selectedAccommodations.includes(acc))}
                            onClick={() => toggleAccommodation(acc)}
                        >
                            {acc}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => {
                    setSelectedWards([]);
                    setSelectedAccommodations([]);
                }}
                style={{
                    marginTop: '8px',
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6',
                    color: colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6'; }}
            >
                Clear all filters
            </button>
        </div>
    );
};

export default WardFilterPanel;
