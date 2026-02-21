import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
    status: 'Paid' | 'Pending' | 'Unpaid';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const config = {
        Paid: {
            color: '#22c55e',
            bg: 'rgba(34, 197, 94, 0.1)',
            icon: <CheckCircle size={14} className="mr-1.5" />,
            shadow: '0 0 12px rgba(34, 197, 94, 0.4)'
        },
        Pending: {
            color: '#f59e0b',
            bg: 'rgba(245, 158, 11, 0.1)',
            icon: <Clock size={14} className="mr-1.5" />,
            shadow: '0 0 12px rgba(245, 158, 11, 0.4)'
        },
        Unpaid: {
            color: '#ef4444',
            bg: 'rgba(239, 68, 68, 0.1)',
            icon: <AlertTriangle size={14} className="mr-1.5" />,
            shadow: '0 0 12px rgba(239, 68, 68, 0.4)'
        }
    };

    const { color, bg, icon, shadow } = config[status];

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '6px 14px',
            borderRadius: '100px',
            backgroundColor: bg,
            color: color,
            fontSize: '13px',
            fontWeight: 700,
            border: `1px solid ${color}30`,
            boxShadow: shadow
        }}>
            {icon}
            {status}
        </div>
    );
};

export default StatusBadge;
