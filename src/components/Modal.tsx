import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    footer,
    size = 'md',
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Size configurations
    const sizeWidths: Record<string, string> = {
        sm: '400px',
        md: '500px',
        lg: '640px',
        xl: '800px',
    };

    // Overlay styles
    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 10000,
        animation: 'fadeIn 0.2s ease-out',
    };

    // Modal content styles
    const contentStyle: React.CSSProperties = {
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: sizeWidths[size],
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideUp 0.3s ease-out',
    };

    // Header styles
    const headerStyle: React.CSSProperties = {
        padding: '24px',
        background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    };

    // Close button styles
    const closeButtonStyle: React.CSSProperties = {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        color: 'white',
    };

    // Body styles
    const bodyStyle: React.CSSProperties = {
        padding: '24px',
        overflowY: 'auto',
        flex: 1,
    };

    // Footer styles
    const footerStyle: React.CSSProperties = {
        padding: '20px 24px',
        borderTop: '1px solid #e5e7eb',
        background: '#f9fafb',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={contentStyle} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={headerStyle}>
                    <div>
                        <h3 style={{
                            margin: 0,
                            fontSize: '20px',
                            fontWeight: 700,
                            color: 'white',
                        }}>
                            {title}
                        </h3>
                        {subtitle && (
                            <p style={{
                                margin: '6px 0 0',
                                fontSize: '14px',
                                color: 'rgba(255, 255, 255, 0.8)',
                            }}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <button
                        style={closeButtonStyle}
                        onClick={onClose}
                        aria-label="Close modal"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={bodyStyle}>
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div style={footerStyle}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
