import React, { useMemo } from 'react';
import type { Room, WardType, AccommodationType } from '../../services/wardData';
import RoomCard from './RoomCard';
import { useHospital } from '../../context/HospitalContext';
import { Map as MapIcon, Layers } from 'lucide-react';

interface WardMapGridProps {
    rooms: Room[];
    selectedWards: WardType[];
    selectedAccommodations: AccommodationType[];
    onRoomClick: (room: Room) => void;
}

const WardMapGrid: React.FC<WardMapGridProps> = ({
    rooms,
    selectedWards,
    selectedAccommodations,
    onRoomClick,
}) => {
    const { colors } = useHospital();

    const filteredRooms = useMemo(() => {
        return rooms.filter(room => {
            const wardMatch = selectedWards.length === 0 || selectedWards.includes(room.wardType);
            const accommodationMatch = selectedAccommodations.length === 0 || selectedAccommodations.includes(room.accommodationType);
            return wardMatch && accommodationMatch;
        });
    }, [rooms, selectedWards, selectedAccommodations]);

    // Group rooms by floor for map layout
    const roomsByFloor = useMemo(() => {
        const floors: Record<number, Room[]> = {};
        filteredRooms.forEach(room => {
            if (!floors[room.floor]) floors[room.floor] = [];
            floors[room.floor].push(room);
        });
        return Object.entries(floors).sort(([a], [b]) => Number(b) - Number(a)); // Higher floors first
    }, [filteredRooms]);

    if (filteredRooms.length === 0) {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px',
                background: colors.surface,
                borderRadius: '20px',
                border: `1px solid ${colors.border}`,
                color: colors.textSecondary,
                gap: '16px',
            }}>
                <MapIcon size={48} strokeWidth={1} />
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, fontWeight: 700 }}>No rooms match your filters</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '14px' }}>Try adjusting your selection or search criteria.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {roomsByFloor.map(([floor, floorRooms]) => (
                <div key={floor} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '0 4px',
                    }}>
                        <Layers size={18} color="#2563eb" />
                        <h4 style={{
                            margin: 0,
                            fontSize: '16px',
                            fontWeight: 800,
                            color: colors.textPrimary,
                            letterSpacing: '0.02em'
                        }}>
                            Floor {floor}
                        </h4>
                        <div style={{
                            flex: 1,
                            height: '2px',
                            background: `linear-gradient(to right, ${colors.border}, transparent)`,
                            opacity: 0.5
                        }} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: '16px',
                    }}>
                        {floorRooms.map(room => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                onClick={onRoomClick}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* Legend */}
            <div style={{
                marginTop: 'auto',
                padding: '20px',
                background: colors.surface,
                borderRadius: '16px',
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
                flexWrap: 'wrap'
            }}>
                {[
                    { label: 'Available', color: '#22c55e' },
                    { label: 'Occupied', color: '#ef4444' },
                    { label: 'Cleaning', color: '#eab308' },
                    { label: 'Reserved', color: '#3b82f6' },
                    { label: 'Unavailable', color: '#6b7280' }
                ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.color }} />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.textSecondary }}>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WardMapGrid;
