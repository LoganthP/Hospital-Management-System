import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import StatsGrid from '../components/dashboard/StatsGrid';
import AppointmentChart from '../components/dashboard/AppointmentChart';
import RecentAppointments from '../components/dashboard/RecentAppointments';
import DoctorList from '../components/dashboard/DoctorList';
import { Sparkles, Sun, Moon, CloudSun } from 'lucide-react';

const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Get greeting based on time
    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return { text: 'Good Morning', icon: Sun, color: '#fbbf24' };
        if (hour < 17) return { text: 'Good Afternoon', icon: CloudSun, color: '#f97316' };
        return { text: 'Good Evening', icon: Moon, color: '#8b5cf6' };
    };

    const greeting = getGreeting();
    const GreetingIcon = greeting.icon;

    return (
        <Layout>
            {/* Welcome Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #0d1628 0%, #0f2044 45%, #0c253d 100%)',
                borderRadius: '24px',
                padding: '32px',
                marginBottom: '32px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(37,99,235,0.18)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}>
                {/* Decorative blobs */}
                <div style={{
                    position: 'absolute',
                    top: '-60px', right: '-60px',
                    width: '220px', height: '220px',
                    borderRadius: '50%',
                    background: 'rgba(37, 99, 235, 0.2)',
                    filter: 'blur(50px)',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-40px', left: '30%',
                    width: '200px', height: '200px',
                    borderRadius: '50%',
                    background: 'rgba(20, 184, 166, 0.15)',
                    filter: 'blur(40px)',
                }} />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                    flexWrap: 'wrap',
                    gap: '24px',
                }}>
                    {/* Left side - Greeting */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '8px',
                        }}>
                            <GreetingIcon size={24} color={greeting.color} />
                            <span style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '14px',
                                fontWeight: 500,
                            }}>
                                {greeting.text}
                            </span>
                        </div>
                        <h1 style={{
                            color: 'white',
                            fontSize: '32px',
                            fontWeight: 700,
                            margin: '0 0 8px 0',
                        }}>
                            Welcome to MediCare Dashboard
                        </h1>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '14px',
                            margin: 0,
                        }}>
                            Overview of hospital activities, appointments, and key metrics
                        </p>
                    </div>

                    {/* Right side - Date/Time & Quick Stats */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    }}>
                        {/* AI Assistant Badge */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5) 0%, rgba(192, 132, 252, 0.3) 100%)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}>
                            <Sparkles size={18} color="#c084fc" />
                            <span style={{
                                color: 'white',
                                fontSize: '13px',
                                fontWeight: 500,
                            }}>
                                AI Ready
                            </span>
                        </div>

                        {/* Date Card */}
                        <div style={{
                            padding: '12px 20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                        }}>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '11px',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                margin: '0 0 4px 0',
                            }}>
                                Today
                            </p>
                            <p style={{
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 600,
                                margin: 0,
                            }}>
                                {currentTime.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <StatsGrid />

            {/* Appointment Chart */}
            <AppointmentChart />

            {/* Two Column Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '24px',
            }}>
                <RecentAppointments />
                <DoctorList />
            </div>
        </Layout>
    );
};

export default Dashboard;
