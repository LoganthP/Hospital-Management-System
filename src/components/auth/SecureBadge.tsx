import React from 'react';
import { ShieldCheck } from 'lucide-react';

const SecureBadge: React.FC = () => (
    <div
        role="note"
        aria-label="Security information"
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            background: 'rgba(37,99,235,0.08)',
            borderRadius: '14px',
            border: '1px solid rgba(37,99,235,0.2)',
        }}
    >
        <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.3) 0%, rgba(20,184,166,0.2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#60a5fa',
            flexShrink: 0,
        }}>
            <ShieldCheck size={18} aria-hidden="true" />
        </div>
        <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3 }}>
                256-bit SSL Encrypted
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginTop: '2px' }}>
                Authorized medical personnel access only
            </div>
        </div>
    </div>
);

export default SecureBadge;
