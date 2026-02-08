import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { Mail, Lock, Activity, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useHospital();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<'Admin' | 'Doctor' | 'Nurse' | 'Patient'>('Doctor');
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
    const [isLoading, setIsLoading] = useState(false);

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock delay
        setTimeout(() => {
            if (activeTab === 'signin') {
                login({
                    id: 'u1',
                    name: 'Dr. Sarah Smith',
                    email: email || 'sarah.smith@hospital.com',
                    role: 'Admin',
                    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
                });
            } else {
                // Mock registration and then login
                login({
                    id: Date.now().toString(),
                    name: name || 'New User',
                    email: email,
                    role: role,
                    avatar: role === 'Patient'
                        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300&h=300'
                        : 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
                });
            }
            setIsLoading(false);
            navigate('/');
        }, 1500);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
            position: 'relative',
            padding: '20px',
            overflow: 'hidden'
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '400px',
                height: '400px',
                background: 'rgba(147, 51, 234, 0.2)',
                borderRadius: '50%',
                filter: 'blur(100px)',
                animation: 'pulse 10s infinite alternate'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '400px',
                height: '400px',
                background: 'rgba(217, 70, 239, 0.15)',
                borderRadius: '50%',
                filter: 'blur(100px)',
                animation: 'pulse 8s infinite alternate-reverse'
            }} />

            {/* Login Card */}
            <div style={{
                width: '100%',
                maxWidth: '440px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '32px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                zIndex: 1
            }}>
                {/* Glossy Header from screenshots style */}
                <div style={{
                    height: '140px',
                    background: 'linear-gradient(180deg, #2d3748 0%, #1a202c 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
                    }} />

                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(168, 85, 247, 0.4)',
                        marginBottom: '12px'
                    }}>
                        <Activity size={32} color="white" />
                    </div>
                    <h1 style={{
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: 800,
                        color: 'white',
                        letterSpacing: '-0.02em'
                    }}>MediCare Login</h1>
                </div>

                {/* Tab Switcher */}
                <div style={{
                    display: 'flex',
                    background: 'rgba(0,0,0,0.2)',
                    padding: '6px',
                    margin: '24px 40px 0',
                    borderRadius: '16px',
                    gap: '4px'
                }}>
                    <button
                        onClick={() => setActiveTab('signin')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '12px',
                            border: 'none',
                            background: activeTab === 'signin' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: activeTab === 'signin' ? 'white' : 'rgba(255,255,255,0.5)',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setActiveTab('signup')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '12px',
                            border: 'none',
                            background: activeTab === 'signup' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: activeTab === 'signup' ? 'white' : 'rgba(255,255,255,0.5)',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                <div style={{ padding: '32px 40px 40px' }}>
                    <form onSubmit={handleAuth} className="space-y-4">
                        {activeTab === 'signup' && (
                            <div className="space-y-2 animate-fade-in">
                                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Full Name</label>
                                <Input
                                    leftIcon={ArrowRight}
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    fullWidth
                                    style={{
                                        background: 'rgba(255,255,255,0.95)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        height: '48px',
                                        color: '#1e293b'
                                    }}
                                />
                            </div>
                        )}

                        {activeTab === 'signup' && (
                            <div className="space-y-3 animate-fade-in">
                                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Account Type</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                    {['Admin', 'Doctor', 'Nurse', 'Patient'].map((r) => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setRole(r as any)}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: '10px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: role === r ? 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)' : 'rgba(255,255,255,0.05)',
                                                color: 'white',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                boxShadow: role === r ? '0 4px 12px rgba(168, 85, 247, 0.3)' : 'none'
                                            }}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Email Address</label>
                            <Input
                                leftIcon={Mail}
                                type="email"
                                placeholder="name@hospital.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                style={{
                                    background: 'rgba(255,255,255,0.95)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    height: '48px',
                                    color: '#1e293b'
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Password</label>
                                {activeTab === 'signin' && (
                                    <a href="#" style={{ color: '#c084fc', fontSize: '12px', fontWeight: 500, textDecoration: 'none' }}>Forgot?</a>
                                )}
                            </div>
                            <Input
                                leftIcon={Lock}
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                style={{
                                    background: 'rgba(255,255,255,0.95)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    height: '48px',
                                    color: '#1e293b'
                                }}
                            />
                        </div>

                        {activeTab === 'signup' && (
                            <div className="space-y-2 animate-fade-in">
                                <label style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>Confirm Password</label>
                                <Input
                                    leftIcon={Lock}
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    fullWidth
                                    style={{
                                        background: 'rgba(255,255,255,0.95)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        height: '48px',
                                        color: '#1e293b'
                                    }}
                                />
                            </div>
                        )}

                        <div className="pt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                isLoading={isLoading}
                                style={{
                                    height: '52px',
                                    fontSize: '16px',
                                    borderRadius: '16px',
                                    marginTop: '8px',
                                    boxShadow: '0 8px 30px rgba(168, 85, 247, 0.4)'
                                }}
                            >
                                {activeTab === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                            </Button>
                        </div>
                    </form>

                    <div style={{
                        marginTop: '32px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'rgba(168, 85, 247, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#c084fc'
                        }}>
                            <ShieldCheck size={18} />
                        </div>
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                            Secure 256-bit encrypted access for authorized medical personnel only.
                        </span>
                    </div>

                    <div style={{
                        marginTop: '24px',
                        textAlign: 'center',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.4)'
                    }}>
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </div>
            </div>

            {/* Footer indicator from screenshot style */}
            <div style={{
                position: 'absolute',
                bottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.05em'
            }}>
                <HeartPulse size={16} /> POWERED BY MEDICARE HMS v2.4
            </div>

            <style>{`
                @keyframes pulse {
                    from { transform: scale(1); opacity: 0.2; }
                    to { transform: scale(1.1); opacity: 0.3; }
                }
            `}</style>
        </div>
    );
};

export default Login;
