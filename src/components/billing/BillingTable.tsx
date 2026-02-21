import React, { useState } from 'react';
import { Filter, ArrowUpDown, ChevronRight, Download, Receipt } from 'lucide-react';
import StatusBadge from './StatusBadge';
import BillingSummaryFooter from './BillingSummaryFooter';

interface BillingData {
    id: string;
    status: 'Paid' | 'Pending' | 'Unpaid';
    count: number;
    amount: number;
    percentage: number;
}

interface BillingTableProps {
    data?: BillingData[];
}

const BillingTable: React.FC<BillingTableProps> = ({ data: externalData }) => {
    const [selectedStatus, setSelectedStatus] = useState<'All' | 'Paid' | 'Pending' | 'Unpaid'>('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: keyof BillingData; direction: 'asc' | 'desc' } | null>(null);

    const initialData: BillingData[] = [
        { id: '1', status: 'Paid', count: 1, amount: 150, percentage: 5 },
        { id: '2', status: 'Pending', count: 2, amount: 2762.5, percentage: 92 },
        { id: '3', status: 'Unpaid', count: 1, amount: 75, percentage: 3 }
    ];

    const displayData = externalData || initialData;

    const handleExport = () => {
        setIsFilterOpen(false);
        const headers = ['Status', 'Count', 'Amount', 'Percentage'];
        const csvContent = [
            headers.join(','),
            ...displayData.map(item => `${item.status},${item.count},${item.amount},${item.percentage}%`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `billing_distribution_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSort = (key: keyof BillingData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...displayData].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredData = sortedData.filter(item => {
        const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
        return matchesStatus;
    });

    const totalInvoices = displayData.reduce((acc, item) => acc + item.count, 0);
    const totalRevenue = displayData.reduce((acc, item) => acc + item.amount, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <div style={{
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(30px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            {/* Table Header / Toolbar */}
            <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)'
                    }}>
                        <Receipt size={24} color="white" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>Billing Distribution</h3>
                        <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Real-time financial status overview</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                fontWeight: 500,
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        >
                            <Filter size={16} color={selectedStatus !== 'All' ? '#60a5fa' : 'white'} />
                            <span>{selectedStatus === 'All' ? 'Filter' : selectedStatus}</span>
                        </button>

                        {isFilterOpen && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 8px)',
                                right: 0,
                                width: '160px',
                                background: 'rgba(15, 23, 42, 0.9)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                                zIndex: 100,
                                padding: '8px',
                                overflow: 'hidden',
                                animation: 'fade-in 0.2s ease-out'
                            }}>
                                {(['All', 'Paid', 'Pending', 'Unpaid'] as const).map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            setSelectedStatus(status);
                                            setIsFilterOpen(false);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            textAlign: 'left',
                                            background: selectedStatus === status ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: selectedStatus === status ? '#60a5fa' : 'white',
                                            fontSize: '13px',
                                            fontWeight: selectedStatus === status ? 600 : 500,
                                            cursor: 'pointer',
                                            transition: 'all 0.15s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (selectedStatus !== status) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (selectedStatus !== status) e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        {status}
                                        {selectedStatus === status && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa' }}></div>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleExport}
                        title="Download CSV"
                        style={{
                            padding: '10px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block" style={{ flex: 1, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(0,0,0,0.1)' }}>
                            <th onClick={() => handleSort('status')} style={{ padding: '20px 32px', textAlign: 'left', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    Payment Status <ArrowUpDown size={12} />
                                </div>
                            </th>
                            <th onClick={() => handleSort('count')} style={{ padding: '20px 32px', textAlign: 'left', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    Invoice Count <ArrowUpDown size={12} />
                                </div>
                            </th>
                            <th style={{ padding: '20px 32px', textAlign: 'left' }}>
                                <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    Flow Weighting
                                </div>
                            </th>
                            <th onClick={() => handleSort('amount')} style={{ padding: '20px 32px', textAlign: 'right', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    Total Amount <ArrowUpDown size={12} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, idx) => (
                            <tr key={row.id} style={{
                                borderBottom: '1px solid rgba(255,255,255,0.03)',
                                transition: 'all 0.2s',
                                background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
                            }}
                                className="hover:bg-[rgba(255,255,255,0.03)]"
                            >
                                <td style={{ padding: '20px 32px' }}>
                                    <StatusBadge status={row.status} />
                                </td>
                                <td style={{ padding: '20px 32px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'white' }}>{row.count}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginLeft: '6px' }}>records</span>
                                </td>
                                <td style={{ padding: '20px 32px' }}>
                                    <div style={{ width: '120px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: `${row.percentage}%`,
                                            background: row.status === 'Paid' ? '#22c55e' : (row.status === 'Pending' ? '#f59e0b' : '#ef4444'),
                                            boxShadow: `0 0 10px ${row.status === 'Paid' ? '#22c55e' : (row.status === 'Pending' ? '#f59e0b' : '#ef4444')}80`
                                        }}></div>
                                    </div>
                                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontWeight: 700, display: 'block', marginTop: '6px' }}>{row.percentage}% Overall</span>
                                </td>
                                <td style={{ padding: '20px 32px', textAlign: 'right' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 900, color: 'white' }}>${row.amount.toLocaleString()}</div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px', fontWeight: 600 }}>USD SETTLEMENT</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden p-6 space-y-4" style={{ flex: 1, overflowY: 'auto' }}>
                {filteredData.map((row) => (
                    <div key={row.id} style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <StatusBadge status={row.status} />
                            <ChevronRight size={18} color="rgba(255,255,255,0.3)" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>Invoices</p>
                                <p style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>{row.count}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>Total Value</p>
                                <p style={{ fontSize: '20px', fontWeight: 900, color: '#60a5fa' }}>${row.amount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <BillingSummaryFooter totalInvoices={totalInvoices} totalRevenue={totalRevenue} />
        </div>
    );
};

export default BillingTable;
