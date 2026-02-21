import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';

const AppointmentChart = () => {
    const [activeBar, setActiveBar] = useState<number | null>(null);

    const chartData = [
        { name: 'Jan', Scheduled: 145, Completed: 32 },
        { name: 'Feb', Scheduled: 125, Completed: 60 },
        { name: 'Mar', Scheduled: 140, Completed: 30 },
        { name: 'Apr', Scheduled: 120, Completed: 65 },
        { name: 'May', Scheduled: 90, Completed: 41 },
        { name: 'Jun', Scheduled: 95, Completed: 25 },
    ];

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'white',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    border: 'none',
                }}>
                    <p style={{
                        margin: '0 0 8px 0',
                        fontWeight: 700,
                        color: '#111827',
                        fontSize: '14px',
                    }}>
                        {label} 2024
                    </p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '4px',
                        }}>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: entry.color,
                            }} />
                            <span style={{ fontSize: '13px', color: '#6b7280' }}>
                                {entry.name}: <strong style={{ color: '#111827' }}>{entry.value}</strong>
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            marginBottom: '32px',
        }}>
            {/* Header */}
            <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #0d1628 0%, #0f2044 50%, #0c253d 100%)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(37,99,235,0.15)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <BarChart3 size={22} color="white" />
                    </div>
                    <div>
                        <h2 style={{
                            margin: 0,
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 700,
                        }}>
                            Appointments Overview
                        </h2>
                        <p style={{
                            margin: '4px 0 0',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '13px',
                        }}>
                            Last 6 months appointment trends
                        </p>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                }}>
                    <TrendingUp size={16} color="white" />
                    <span style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>
                        +8.3% avg
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div style={{ padding: '24px' }}>
                <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                            barGap={8}
                            onMouseMove={(state) => {
                                if (typeof state.activeTooltipIndex === 'number') {
                                    setActiveBar(state.activeTooltipIndex);
                                }
                            }}
                            onMouseLeave={() => setActiveBar(null)}
                        >
                            <defs>
                                <linearGradient id="scheduledGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#9333ea" />
                                    <stop offset="100%" stopColor="#c084fc" />
                                </linearGradient>
                                <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2563eb" />
                                    <stop offset="100%" stopColor="#60a5fa" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#f3f4f6"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                            <Bar
                                dataKey="Scheduled"
                                fill="url(#scheduledGradient)"
                                radius={[8, 8, 0, 0]}
                                maxBarSize={45}
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={`cell-scheduled-${index}`}
                                        opacity={activeBar === null || activeBar === index ? 1 : 0.5}
                                    />
                                ))}
                            </Bar>
                            <Bar
                                dataKey="Completed"
                                fill="url(#completedGradient)"
                                radius={[8, 8, 0, 0]}
                                maxBarSize={45}
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={`cell-completed-${index}`}
                                        opacity={activeBar === null || activeBar === index ? 1 : 0.5}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '32px',
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #f3f4f6',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '4px',
                            background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
                        }} />
                        <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
                            Scheduled
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '4px',
                            background: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
                        }} />
                        <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
                            Completed
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentChart;
