import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useHospital } from '../context/HospitalContext';
import WardFilterPanel from '../components/ward/WardFilterPanel';
import WardMapGrid from '../components/ward/WardMapGrid';
import RoomDetailModal from '../components/ward/RoomDetailModal';
import type { WardType, AccommodationType, Room } from '../services/wardData';
import { ChevronRight, Home, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/ward.css';

const WardManagement = () => {
    const { rooms, colors } = useHospital();

    // UI State
    const [selectedWards, setSelectedWards] = useState<WardType[]>([]);
    const [selectedAccommodations, setSelectedAccommodations] = useState<AccommodationType[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRoomClick = (room: Room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    // Breadcrumb style
    const bcItemStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: 500,
        color: colors.textSecondary,
        textDecoration: 'none',
    };

    return (
        <Layout>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Header & Breadcrumbs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Link to="/" style={bcItemStyle}>
                            <Home size={14} />
                            Dashboard
                        </Link>
                        <ChevronRight size={14} color={colors.textMuted} />
                        <span style={{ ...bcItemStyle, color: colors.textPrimary }}>Ward Management</span>
                    </nav>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        padding: '32px',
                        borderRadius: '24px',
                        color: 'white',
                        boxShadow: '0 20px 40px -12px rgba(0,0,0,0.25)'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <div style={{
                                    padding: '8px',
                                    background: 'rgba(37, 99, 235, 0.2)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Activity size={24} color="#60a5fa" />
                                </div>
                                <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                                    Ward Management
                                </h1>
                            </div>
                            <p style={{ margin: 0, opacity: 0.7, fontSize: '15px' }}>
                                Monitor ward availability, occupancy, and cleaning status in real-time
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '24px', fontWeight: 800 }}>{rooms.length}</div>
                                <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Total Rooms</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '24px', fontWeight: 800, color: '#22c55e' }}>
                                    {rooms.filter(r => r.status === 'Available').length}
                                </div>
                                <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Available</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="ward-content-grid">
                    {/* Left Sidebar Filters */}
                    <div className="ward-sidebar-filters">
                        <WardFilterPanel
                            selectedWards={selectedWards}
                            setSelectedWards={setSelectedWards}
                            selectedAccommodations={selectedAccommodations}
                            setSelectedAccommodations={setSelectedAccommodations}
                        />
                    </div>

                    {/* Central Map Grid */}
                    <div className="ward-map-container">
                        <WardMapGrid
                            rooms={rooms}
                            selectedWards={selectedWards}
                            selectedAccommodations={selectedAccommodations}
                            onRoomClick={handleRoomClick}
                        />
                    </div>
                </div>
            </div>

            {/* Room Detail Modal */}
            <RoomDetailModal
                room={selectedRoom ? (rooms.find(r => r.id === (selectedRoom as Room).id) || selectedRoom) : null}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </Layout>
    );
};

export default WardManagement;
