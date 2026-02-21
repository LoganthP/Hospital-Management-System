import { useState, useEffect } from 'react';
import { Users, Calendar, IndianRupee, TrendingUp, TrendingDown } from 'lucide-react';

const STATS = [
    {
        title: 'Total Patients',
        value: 1233,
        displayValue: '1,233',
        icon: Users,
        trend: '+5.2%',
        trendLabel: 'this month',
        isPositive: true,
        gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
        shadowColor: 'rgba(37, 99, 235, 0.35)',
        glowStop: '#2563eb',
    },
    {
        title: 'Appointments Today',
        value: 86,
        displayValue: '86',
        icon: Calendar,
        trend: '-1.5%',
        trendLabel: 'from yesterday',
        isPositive: false,
        gradient: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)',
        shadowColor: 'rgba(20, 184, 166, 0.35)',
        glowStop: '#14b8a6',
    },
    {
        title: 'Revenue This Month',
        value: 5678900,
        displayValue: '₹56,78,900',
        icon: IndianRupee,
        trend: '+12.8%',
        trendLabel: 'this month',
        isPositive: true,
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        shadowColor: 'rgba(37, 99, 235, 0.3)',
        glowStop: '#1e40af',
    },
];

const StatsGrid = () => {
    const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    useEffect(() => {
        const duration = 1400;
        const steps = 55;
        const interval = duration / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setAnimatedValues(STATS.map(s => Math.floor(s.value * easeOut)));
            if (step >= steps) clearInterval(timer);
        }, interval);
        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number, index: number): string =>
        index === 2 ? '₹' + num.toLocaleString('en-IN') : num.toLocaleString();

    const getCardStyle = (index: number, stat: typeof STATS[0]): React.CSSProperties => {
        const isHovered = hoveredCard === index;
        return {
            background: stat.gradient,
            borderRadius: '22px',
            padding: '26px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0)',
            boxShadow: isHovered
                ? `0 24px 48px ${stat.shadowColor}, 0 0 0 1px rgba(255,255,255,0.08) inset`
                : `0 8px 24px ${stat.shadowColor}`,
        };
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
        }}>
            {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        style={getCardStyle(index, stat)}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        {/* Decorative circles */}
                        <div style={{
                            position: 'absolute', top: '-30px', right: '-30px',
                            width: '120px', height: '120px', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.08)',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: '-40px', left: '-20px',
                            width: '100px', height: '100px', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.04)',
                        }} />
                        {/* Shimmer line */}
                        <div style={{
                            position: 'absolute', top: 0, left: '20%', right: '20%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }} />

                        {/* Header row */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '20px',
                            position: 'relative',
                            zIndex: 1,
                        }}>
                            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.01em' }}>
                                {stat.title}
                            </span>
                            <div style={{
                                width: '42px', height: '42px', borderRadius: '12px',
                                background: 'rgba(255,255,255,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}>
                                <Icon size={20} color="white" />
                            </div>
                        </div>

                        {/* Value */}
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h3 style={{
                                color: 'white', fontSize: '38px', fontWeight: 800,
                                margin: '0 0 14px', letterSpacing: '-0.03em',
                                textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            }}>
                                {formatNumber(animatedValues[index], index)}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                    padding: '4px 10px', borderRadius: '50px',
                                    background: stat.isPositive ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                }}>
                                    {stat.isPositive
                                        ? <TrendingUp size={13} color="white" />
                                        : <TrendingDown size={13} color="white" />
                                    }
                                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontWeight: 500 }}>
                                    {stat.trendLabel}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsGrid;
