import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Database } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
    className?: string;
    title?: string;
    subtitle?: string;
    pageSize?: number;
}

const Table = <T extends { id: string | number }>({
    data,
    columns,
    onRowClick,
    className = '',
    title,
    subtitle,
    pageSize = 10,
}: TableProps<T>) => {
    const { resolvedTheme } = useHospital();
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredRow, setHoveredRow] = useState<string | number | null>(null);

    // Determine if dark mode is active
    const isDark = resolvedTheme === 'dark';

    // Colors based on theme
    const colors = {
        surface: isDark ? '#1e293b' : 'white',
        surfaceAlt: isDark ? '#0f172a' : '#fafafa',
        surfaceHover: isDark ? '#334155' : '#f0f9ff',
        border: isDark ? '#334155' : '#e5e7eb',
        borderLight: isDark ? '#475569' : '#f3f4f6',
        textPrimary: isDark ? '#f8fafc' : '#374151',
        textSecondary: isDark ? '#94a3b8' : '#6b7280',
        headerBg: isDark ? '#0f172a' : '#f9fafb',
        paginationBg: isDark ? '#1e293b' : 'white',
        paginationBgDisabled: isDark ? '#0f172a' : '#f3f4f6',
    };

    // Pagination logic
    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = data.slice(startIndex, startIndex + pageSize);

    // Container styles
    const containerStyle: React.CSSProperties = {
        background: colors.surface,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isDark
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${colors.border}`,
    };

    // Header styles
    const headerStyle: React.CSSProperties = {
        padding: '20px 24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    // Table header row styles
    const thStyle: React.CSSProperties = {
        padding: '16px 24px',
        textAlign: 'left',
        fontSize: '12px',
        fontWeight: 600,
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        background: colors.headerBg,
        borderBottom: `2px solid ${colors.border}`,
    };

    // Table cell styles
    const tdStyle: React.CSSProperties = {
        padding: '16px 24px',
        fontSize: '14px',
        color: colors.textPrimary,
        borderBottom: `1px solid ${colors.borderLight}`,
    };

    // Pagination button styles
    const paginationBtnStyle = (disabled: boolean): React.CSSProperties => ({
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        fontSize: '13px',
        fontWeight: 500,
        color: disabled ? colors.textSecondary : colors.textPrimary,
        background: disabled ? colors.paginationBgDisabled : colors.paginationBg,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
    });

    return (
        <div className={className} style={containerStyle}>
            {/* Header with title */}
            {(title || subtitle) && (
                <div style={headerStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Database size={20} color="white" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'white' }}>
                                {title}
                            </h3>
                            {subtitle && (
                                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                    <span style={{
                        padding: '6px 12px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'white',
                    }}>
                        {data.length} records
                    </span>
                </div>
            )}

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} style={thStyle} className={col.className}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => (
                                <tr
                                    key={row.id}
                                    onClick={() => onRowClick?.(row)}
                                    onMouseEnter={() => setHoveredRow(row.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    style={{
                                        background: hoveredRow === row.id
                                            ? colors.surfaceHover
                                            : rowIndex % 2 === 0
                                                ? colors.surface
                                                : colors.surfaceAlt,
                                        cursor: onRowClick ? 'pointer' : 'default',
                                        transition: 'background-color 0.2s',
                                    }}
                                >
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} style={tdStyle} className={col.className}>
                                            {typeof col.accessor === 'function'
                                                ? col.accessor(row)
                                                : (row[col.accessor] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    style={{
                                        padding: '48px 24px',
                                        textAlign: 'center',
                                        color: colors.textSecondary,
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                        <Database size={48} color={colors.border} />
                                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 500, color: colors.textPrimary }}>No data available</p>
                                        <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>Start by adding new records</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            {data.length > pageSize && (
                <div style={{
                    padding: '16px 24px',
                    borderTop: `1px solid ${colors.border}`,
                    background: colors.headerBg,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <span style={{ fontSize: '14px', color: colors.textSecondary }}>
                        Showing {startIndex + 1} to {Math.min(startIndex + pageSize, data.length)} of {data.length}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            style={paginationBtnStyle(currentPage === 1)}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={16} /> Previous
                        </button>
                        <button
                            style={paginationBtnStyle(currentPage === totalPages)}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;

