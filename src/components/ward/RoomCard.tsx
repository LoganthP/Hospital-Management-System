import React, { useState } from 'react';
import type { Room, RoomStatus } from '../../services/wardData';
import { useHospital } from '../../context/HospitalContext';
import { Stethoscope, ShieldCheck } from 'lucide-react';

interface RoomCardProps {
    room: Room;
    onClick: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
    const { colors, resolvedTheme } = useHospital();
    const [isHovered, setIsHovered] = useState(false);
    const isDark = resolvedTheme === 'dark';

    const getStatusColor = (status: RoomStatus) => {
        switch (status) {
            case 'Available': return '#22c55e'; // Green
            case 'Occupied': return '#ef4444';  // Red
            case 'Cleaning': return '#eab308';  // Yellow
            case 'Reserved': return '#3b82f6';  // Blue
            case 'Unavailable': return '#6b7280'; // Gray
            default: return '#9ca3af';
        }
    };

    const cardStyle: React.CSSProperties = {
        background: isDark ? 'rgba(30, 41, 59, 0.7)' : 'white',
        border: `2px solid ${isHovered ? getStatusColor(room.status) : colors.border}`,
        borderRadius: '12px',
        padding: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxShadow: isHovered ? `0 8px 16px -4px rgba(0,0,0,0.2)` : 'none',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
    };

    const statusIndicatorStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '4px',
        height: '100%',
        background: getStatusColor(room.status),
    };

    const tooltipStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#0f172a',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '11px',
        whiteSpace: 'nowrap',
        zIndex: 100,
        opacity: isHovered ? 1 : 0,
        pointerEvents: 'none',
        transition: 'opacity 0.2s',
        marginBottom: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(room)}
        >
            {isHovered && (
                <div style={tooltipStyle}>
                    <div style={{ fontWeight: 700, marginBottom: '2px' }}>{room.roomNumber}</div>
                    <div>{room.wardType} | {room.accommodationType}</div>
                    <div>Beds: {room.occupiedBeds}/{room.capacity}</div>
                    <div style={{ color: '#94a3b8', fontSize: '10px', marginTop: '4px' }}>Cleaned: {room.lastCleaned}</div>
                </div>
            )}

            <div style={statusIndicatorStyle} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: colors.textPrimary }}>
                    {room.roomNumber}
                </span>
                <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: `${getStatusColor(room.status)}20`,
                    color: getStatusColor(room.status)
                }}>
                    {room.status}
                </span>
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: room.capacity }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '2px',
                            background: i < room.occupiedBeds ? getStatusColor(room.status) : (isDark ? '#334155' : '#e5e7eb')
                        }}
                    />
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} color={colors.textMuted} />
                    <span style={{ fontSize: '11px', color: colors.textSecondary }}>Floor {room.floor}</span>
                </div>
                {room.assignedDoctor && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Stethoscope size={12} color="#2563eb" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomCard;
