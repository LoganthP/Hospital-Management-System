import React from 'react';

interface BillingSummaryFooterProps {
    totalInvoices: number;
    totalRevenue: string;
}

const BillingSummaryFooter: React.FC<BillingSummaryFooterProps> = ({ totalInvoices, totalRevenue }) => {
    return (
        <div style={{
            padding: '24px 32px',
            background: 'linear-gradient(to right, rgba(15, 23, 42, 0.3), rgba(30, 41, 59, 0.3))',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomLeftRadius: '24px',
            borderBottomRightRadius: '24px'
        }}>
            <div>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Processed</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'white', marginTop: '4px' }}>{totalInvoices} Invoices</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Revenue</span>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#60a5fa', marginTop: '4px', textShadow: '0 0 20px rgba(96, 165, 250, 0.3)' }}>
                    {totalRevenue}
                </div>
            </div>
        </div>
    );
};

export default BillingSummaryFooter;
