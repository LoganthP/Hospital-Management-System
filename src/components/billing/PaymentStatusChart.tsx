import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PaymentStatusChart = ({ data }: { data: { name: string; value: number; amount: number; color: string }[] }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Status Distribution</h3>

            <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: any, name: any, props: any) => [
                                `${value} Invoices ($${props.payload.amount.toLocaleString()})`,
                                name
                            ]}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="px-3 py-2 rounded-l-lg">Status</th>
                            <th className="px-3 py-2 text-right">Count</th>
                            <th className="px-3 py-2 rounded-r-lg text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((item) => (
                            <tr key={item.name}>
                                <td className="px-3 py-2 font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                    {item.name}
                                </td>
                                <td className="px-3 py-2 text-right">{item.value}</td>
                                <td className="px-3 py-2 text-right font-semibold">${item.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentStatusChart;
