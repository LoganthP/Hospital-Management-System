import React, { useState } from 'react';
import type { Room, RoomStatus } from '../../services/wardData';
import Modal from '../Modal';
import { useHospital } from '../../context/HospitalContext';
import {
    User,
    Stethoscope,
    Clock,
    Bed,
    ShieldCheck,
    CheckCircle2,
    RefreshCcw,
    Bookmark,
    X
} from 'lucide-react';
import Button from '../Button';
import Select from '../Select';

interface RoomDetailModalProps {
    room: Room | null;
    isOpen: boolean;
    onClose: () => void;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, isOpen, onClose }) => {
    const {
        colors,
        updateRoomStatus,
        assignPatientToRoom,
        assignDoctorToRoom,
        patients,
        doctors
    } = useHospital();

    const [isAssigningPatient, setIsAssigningPatient] = useState(false);

    if (!room) return null;

    const getStatusIcon = (status: RoomStatus) => {
        switch (status) {
            case 'Available': return <CheckCircle2 size={24} color="#22c55e" />;
            case 'Occupied': return <User size={24} color="#ef4444" />;
            case 'Cleaning': return <RefreshCcw size={24} color="#eab308" />;
            case 'Reserved': return <Bookmark size={24} color="#3b82f6" />;
            case 'Unavailable': return <X size={24} color="#6b7280" />;
            default: return null;
        }
    };

    const infoItemStyle: React.CSSProperties = {
        padding: '16px',
        borderRadius: '12px',
        background: colors.background,
        border: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    };

    const labelStyle: React.CSSProperties = {
        fontSize: '12px',
        fontWeight: 600,
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '2px',
    };

    const valueStyle: React.CSSProperties = {
        fontSize: '15px',
        fontWeight: 700,
        color: colors.textPrimary,
    };

    const doctorOptions = doctors.map(d => ({ value: d.name, label: d.name }));
    const patientOptions = patients.map(p => ({ value: p.name, label: p.name }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Room ${room.roomNumber} - Details`}
            size="md"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Header Info */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    color: 'white'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {getStatusIcon(room.status)}
                        </div>
                        <div>
                            <div style={{ fontSize: '20px', fontWeight: 800 }}>{room.roomNumber}</div>
                            <div style={{ fontSize: '13px', opacity: 0.8 }}>{room.wardType} | {room.accommodationType}</div>
                        </div>
                    </div>
                </div>

                {/* Grid Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={infoItemStyle}>
                        <Bed size={18} color="#2563eb" />
                        <div>
                            <div style={labelStyle}>Occupancy</div>
                            <div style={valueStyle}>{room.occupiedBeds} / {room.capacity} Beds</div>
                        </div>
                    </div>
                    <div style={infoItemStyle}>
                        <ShieldCheck size={18} color="#2563eb" />
                        <div>
                            <div style={labelStyle}>Floor</div>
                            <div style={valueStyle}>Level {room.floor}</div>
                        </div>
                    </div>
                    <div style={infoItemStyle}>
                        <Clock size={18} color="#2563eb" />
                        <div>
                            <div style={labelStyle}>Last Cleaned</div>
                            <div style={valueStyle}>{room.lastCleaned}</div>
                        </div>
                    </div>
                    <div style={{ ...infoItemStyle, flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Stethoscope size={18} color="#2563eb" />
                            <div style={labelStyle}>Assigned Doctor</div>
                        </div>
                        <Select
                            options={doctorOptions}
                            value={room.assignedDoctor || ''}
                            onChange={(e) => assignDoctorToRoom(room.id, e.target.value)}
                            fullWidth
                            style={{
                                padding: '4px 32px 4px 0',
                                fontSize: '15px',
                                fontWeight: 700,
                                border: 'none',
                                background: 'transparent',
                                color: colors.textPrimary
                            }}
                        />
                    </div>
                </div>

                {/* Occupancy Detail (if occupied) */}
                <div style={{
                    ...infoItemStyle,
                    background: room.status === 'Occupied' ? 'rgba(37, 99, 235, 0.05)' : colors.background,
                    borderColor: room.status === 'Occupied' ? 'rgba(37, 99, 235, 0.2)' : colors.border,
                    flexDirection: 'column',
                    alignItems: 'stretch'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isAssigningPatient ? '12px' : '0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <User size={20} color="#2563eb" />
                            <div>
                                <div style={labelStyle}>Current Patient</div>
                                <div style={valueStyle}>{room.currentPatient || 'No Patient Assigned'}</div>
                            </div>
                        </div>
                        {room.currentPatient && (
                            <button
                                onClick={() => assignPatientToRoom(room.id, null)}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                            >
                                <X size={16} color={colors.textMuted} />
                            </button>
                        )}
                    </div>

                    {isAssigningPatient && (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                            <Select
                                label="Select Patient"
                                options={patientOptions}
                                value={room.currentPatient || ''}
                                onChange={(e) => {
                                    assignPatientToRoom(room.id, e.target.value);
                                    setIsAssigningPatient(false);
                                }}
                                fullWidth
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAssigningPatient(false)}
                                style={{ marginBottom: '4px' }}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '20px', marginTop: '8px' }}>
                    <div style={{ ...labelStyle, marginBottom: '16px' }}>Manage Room Status</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* Maintenance Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            <Button
                                variant="success"
                                size="sm"
                                onClick={() => { updateRoomStatus(room.id, 'Available'); onClose(); }}
                                style={{ opacity: (room.status === 'Available' && !room.currentPatient) ? 0.5 : 1 }}
                                disabled={room.status === 'Available' && !room.currentPatient}
                            >
                                Available
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => { updateRoomStatus(room.id, 'Cleaning'); onClose(); }}
                                style={{ opacity: room.status === 'Cleaning' ? 0.5 : 1 }}
                                disabled={room.status === 'Cleaning'}
                            >
                                Cleaning
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => { updateRoomStatus(room.id, 'Unavailable'); onClose(); }}
                                style={{
                                    opacity: room.status === 'Unavailable' ? 0.5 : 1,
                                    background: 'linear-gradient(135deg, #4b5563 0%, #1f2937 100%)',
                                    border: 'none'
                                }}
                                disabled={room.status === 'Unavailable'}
                            >
                                Unavailable
                            </Button>
                        </div>

                        {/* Assignment Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '8px' }}>
                            <Button
                                variant="danger"
                                onClick={() => setIsAssigningPatient(true)}
                                style={{ opacity: room.status === 'Occupied' ? 0.5 : 1 }}
                                disabled={isAssigningPatient}
                                fullWidth
                            >
                                {room.status === 'Occupied' ? 'Change Patient' : 'Assign Patient'}
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => { updateRoomStatus(room.id, 'Reserved'); onClose(); }}
                                style={{ opacity: room.status === 'Reserved' ? 0.5 : 1 }}
                                disabled={room.status === 'Reserved'}
                                fullWidth
                            >
                                Reserve
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RoomDetailModal;
