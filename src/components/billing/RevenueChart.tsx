import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const RevenueChart = () => {
    const data = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 5000 },
        { name: 'Apr', revenue: 4500 },
        { name: 'May', revenue: 6000 },
        { name: 'Jun', revenue: 5500 },
        { name: 'Jul', revenue: 7000 },
        { name: 'Aug', revenue: 6500 },
        { name: 'Sep', revenue: 8000 },
        { name: 'Oct', revenue: 7500 },
        { name: 'Nov', revenue: 9000 },
        { name: 'Dec', revenue: 12450 },
    ];

    return (
        <div style={{
            background: 'rgba(15, 23, 42, 0.4)',
            padding: '32px',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(30px)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)'
                    }}>
                        <Activity size={24} color="white" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>Revenue Intelligence</h3>
                        <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Predictive annual income forecast</p>
                    </div>
                </div>
            </div>

            <div style={{ height: '350px', width: '100%', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)',
                                backdropFilter: 'blur(10px)',
                                color: 'white'
                            }}
                            itemStyle={{ color: '#10b981', fontWeight: 800 }}
                            formatter={(value: any) => [`$${value.toLocaleString()}`, 'NET REVENUE']}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10B981"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, fill: '#fff', strokeWidth: 4, stroke: '#10B981' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
