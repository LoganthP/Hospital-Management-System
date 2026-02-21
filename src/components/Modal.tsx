import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

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
    const { colors, resolvedTheme } = useHospital();

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
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 10000,
        animation: 'fadeIn 0.2s ease-out',
    };

    // Modal content styles
    const contentStyle: React.CSSProperties = {
        background: colors.surface,
        borderRadius: '24px',
        boxShadow: colors.dropdownShadow,
        width: '100%',
        maxWidth: sizeWidths[size],
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideUp 0.3s ease-out',
        border: `1px solid ${colors.border}`,
    };

    // Header styles — Uses Navy Medical Gradient
    const headerStyle: React.CSSProperties = {
        padding: '24px 32px',
        background: 'linear-gradient(135deg, #0d1628 0%, #0c253d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: `1px solid rgba(37,99,235,0.2)`,
    };

    // Close button styles
    const closeButtonStyle: React.CSSProperties = {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.15)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        color: 'white',
        position: 'relative',
        zIndex: 2,
    };

    // Body styles
    const bodyStyle: React.CSSProperties = {
        padding: '32px',
        overflowY: 'auto',
        flex: 1,
        background: colors.surface,
    };

    // Footer styles
    const footerStyle: React.CSSProperties = {
        padding: '20px 32px',
        borderTop: `1px solid ${colors.border}`,
        background: resolvedTheme === 'dark' ? '#111827' : '#f9fafb',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={contentStyle} onClick={e => e.stopPropagation()}>
                {/* Header with decorative blob */}
                <div style={headerStyle}>
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '-50px',
                        width: '150px',
                        height: '150px',
                        background: 'rgba(20, 184, 166, 0.15)',
                        filter: 'blur(30px)',
                        borderRadius: '50%',
                    }}></div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
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
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.7)',
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
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                            e.currentTarget.style.transform = 'rotate(90deg)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.transform = 'rotate(0deg)';
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
