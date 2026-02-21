import React from 'react';
import { Activity, HeartPulse, Shield, Stethoscope } from 'lucide-react';

const MedicalIllustration: React.FC = () => {
    return (
        <div
            aria-hidden="true"
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 40px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative background circles */}
            <div style={{
                position: 'absolute', top: '-80px', right: '-80px',
                width: '300px', height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)',
            }} />
            <div style={{
                position: 'absolute', bottom: '-60px', left: '-60px',
                width: '260px', height: '260px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
            }} />
            <div style={{
                position: 'absolute', top: '40%', left: '-40px',
                width: '180px', height: '180px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
            }} />

            {/* Floating stat cards */}
            <div style={{ position: 'absolute', top: '60px', right: '20px' }}>
                <StatCard icon={<HeartPulse size={14} />} value="98.6°F" label="Body Temp" color="#f472b6" />
            </div>
            <div style={{ position: 'absolute', bottom: '100px', left: '16px' }}>
                <StatCard icon={<Activity size={14} />} value="72 BPM" label="Heart Rate" color="#34d399" />
            </div>
            <div style={{ position: 'absolute', bottom: '60px', right: '20px' }}>
                <StatCard icon={<Shield size={14} />} value="A+" label="Blood Type" color="#60a5fa" />
            </div>

            {/* Main SVG Illustration */}
            <div style={{ position: 'relative', marginBottom: '36px' }}>
                <svg
                    width="220"
                    height="220"
                    viewBox="0 0 220 220"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer ring */}
                    <circle cx="110" cy="110" r="105" stroke="rgba(37,99,235,0.15)" strokeWidth="1.5" strokeDasharray="6 4" />
                    <circle cx="110" cy="110" r="85" fill="rgba(37,99,235,0.08)" />
                    <circle cx="110" cy="110" r="85" stroke="rgba(37,99,235,0.2)" strokeWidth="1" />

                    {/* Cross / Plus sign — medical symbol */}
                    <rect x="96" y="66" width="28" height="88" rx="14" fill="url(#blueGrad)" />
                    <rect x="66" y="96" width="88" height="28" rx="14" fill="url(#blueGrad)" />

                    {/* Heartbeat line */}
                    <polyline
                        points="60,140 80,140 90,118 100,158 110,110 120,135 130,135 140,140 160,140"
                        stroke="#14b8a6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />

                    {/* Small dots */}
                    <circle cx="60" cy="140" r="3" fill="#14b8a6" opacity="0.6" />
                    <circle cx="160" cy="140" r="3" fill="#14b8a6" opacity="0.6" />

                    <defs>
                        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.7" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Stethoscope icon overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    right: '-8px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(20,184,166,0.4)',
                }}>
                    <Stethoscope size={22} color="white" />
                </div>
            </div>

            {/* Branding Text */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'center',
                    marginBottom: '16px',
                }}>
                    <div style={{
                        width: '40px', height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
                    }}>
                        <Activity size={22} color="white" />
                    </div>
                    <span style={{
                        fontSize: '26px',
                        fontWeight: 800,
                        color: 'white',
                        letterSpacing: '-0.03em',
                    }}>
                        Medi<span style={{ color: '#60a5fa' }}>Care</span>
                    </span>
                </div>

                <h2 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.92)',
                    margin: '0 0 12px',
                    lineHeight: 1.3,
                }}>
                    Advanced Hospital<br />Management System
                </h2>

                <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: '280px',
                }}>
                    Streamlining patient care, appointments, and medical workflows — all in one secure platform.
                </p>

                {/* Feature pills */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    justifyContent: 'center',
                    marginTop: '24px',
                }}>
                    {['Patient Records', 'AI Diagnostics', 'Smart Billing'].map(feat => (
                        <span key={feat} style={{
                            padding: '5px 12px',
                            borderRadius: '50px',
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: 'rgba(255,255,255,0.6)',
                            letterSpacing: '0.02em',
                        }}>
                            {feat}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color }) => (
    <div style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '110px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    }}>
        <div style={{
            width: '28px', height: '28px',
            borderRadius: '8px',
            background: `${color}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color,
            flexShrink: 0,
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>{value}</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{label}</div>
        </div>
    </div>
);

export default MedicalIllustration;
