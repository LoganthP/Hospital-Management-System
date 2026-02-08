import { useState, useEffect } from 'react';
import { Users, Calendar, IndianRupee, TrendingUp, TrendingDown } from 'lucide-react';

const StatsGrid = () => {
    const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const stats = [
        {
            title: 'Total Patients',
            value: 1233,
            displayValue: '1,233',
            icon: Users,
            trend: '+5.2%',
            trendLabel: 'this month',
            isPositive: true,
            gradient: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
            shadowColor: 'rgba(147, 51, 234, 0.4)',
            iconBg: 'rgba(255, 255, 255, 0.2)',
        },
        {
            title: 'Appointments Today',
            value: 86,
            displayValue: '86',
            icon: Calendar,
            trend: '-1.5%',
            trendLabel: 'from yesterday',
            isPositive: false,
            gradient: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
            shadowColor: 'rgba(37, 99, 235, 0.4)',
            iconBg: 'rgba(255, 255, 255, 0.2)',
        },
        {
            title: 'Revenue This Month',
            value: 5678900,
            displayValue: '₹56,78,900',
            icon: IndianRupee,
            trend: '+12.8%',
            trendLabel: 'this month',
            isPositive: true,
            gradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
            shadowColor: 'rgba(5, 150, 105, 0.4)',
            iconBg: 'rgba(255, 255, 255, 0.2)',
        },
    ];

    // Animate values on mount
    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const interval = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setAnimatedValues(stats.map(stat => Math.floor(stat.value * easeOut)));

            if (step >= steps) {
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    // Card styles
    const getCardStyle = (index: number, stat: typeof stats[0]): React.CSSProperties => {
        const isHovered = hoveredCard === index;
        return {
            background: stat.gradient,
            borderRadius: '20px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
            boxShadow: isHovered
                ? `0 20px 40px ${stat.shadowColor}`
                : `0 10px 25px ${stat.shadowColor}`,
        };
    };

    // Format animated number
    const formatNumber = (num: number, index: number): string => {
        if (index === 2) {
            // Revenue format
            return '₹' + num.toLocaleString('en-IN');
        }
        return num.toLocaleString();
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
        }}>
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        style={getCardStyle(index, stat)}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        {/* Decorative circle */}
                        <div style={{
                            position: 'absolute',
                            top: '-30px',
                            right: '-30px',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '-40px',
                            left: '-40px',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.05)',
                        }} />

                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '20px',
                            position: 'relative',
                            zIndex: 1,
                        }}>
                            <span style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '14px',
                                fontWeight: 500,
                            }}>
                                {stat.title}
                            </span>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: stat.iconBg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(10px)',
                            }}>
                                <Icon size={22} color="white" />
                            </div>
                        </div>

                        {/* Value */}
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h3 style={{
                                color: 'white',
                                fontSize: '36px',
                                fontWeight: 700,
                                margin: '0 0 12px 0',
                                letterSpacing: '-0.02em',
                            }}>
                                {formatNumber(animatedValues[index], index)}
                            </h3>

                            {/* Trend */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '4px 10px',
                                    borderRadius: '9999px',
                                    background: stat.isPositive
                                        ? 'rgba(255, 255, 255, 0.25)'
                                        : 'rgba(255, 255, 255, 0.15)',
                                }}>
                                    {stat.isPositive
                                        ? <TrendingUp size={14} color="white" />
                                        : <TrendingDown size={14} color="white" />
                                    }
                                    <span style={{
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                    }}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <span style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '12px',
                                }}>
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
