import { useState } from 'react';
import Layout from '../components/Layout';
import { useHospital } from '../context/HospitalContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Modal from '../components/Modal';
import { Plus, Search, Download, Edit2, IndianRupee, TrendingUp, Clock, CheckCircle, AlertCircle, FileText, Receipt } from 'lucide-react';
import RevenueChart from '../components/billing/RevenueChart';
import BillingTable from '../components/billing/BillingTable';

interface Invoice {
    id: string;
    patientName: string;
    amount: number;
    date: string;
    status: 'Paid' | 'Pending' | 'Unpaid';
    service: string;
}

const Billing = () => {
    const { resolvedTheme, colors } = useHospital();
    const [invoices, setInvoices] = useState<Invoice[]>([
        { id: 'INV-004', patientName: 'Balraj', amount: 2412.00, date: '2026-02-08', status: 'Pending', service: 'Annual Checkup' },
        { id: 'INV-001', patientName: 'John Doe', amount: 150.00, date: '2025-05-10', status: 'Paid', service: 'Consultation' },
        { id: 'INV-002', patientName: 'Jane Smith', amount: 350.50, date: '2025-05-11', status: 'Pending', service: 'X-Ray & Lab' },
        { id: 'INV-003', patientName: 'Alice Johnson', amount: 75.00, date: '2025-05-12', status: 'Unpaid', service: 'Follow-up' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<Invoice, 'id'>>({
        patientName: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        service: ''
    });

    const handleOpenModal = (invoice?: Invoice) => {
        if (invoice) {
            setEditingInvoice(invoice);
            setFormData({
                patientName: invoice.patientName,
                amount: invoice.amount,
                date: invoice.date,
                status: invoice.status,
                service: invoice.service
            });
        } else {
            setEditingInvoice(null);
            setFormData({
                patientName: '',
                amount: 0,
                date: new Date().toISOString().split('T')[0],
                status: 'Pending',
                service: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingInvoice) {
            setInvoices(invoices.map(inv => inv.id === editingInvoice.id ? { ...inv, ...formData } : inv));
        } else {
            const newInv: Invoice = {
                id: `INV-00${invoices.length + 1}`,
                ...formData
            };
            setInvoices([newInv, ...invoices]);
        }
        setIsModalOpen(false);
    };

    const handlePrint = (invoice: Invoice) => {
        const content = `
MEDICARE HOSPITAL INVOICE
-------------------------
Invoice ID: ${invoice.id}
Date:       ${invoice.date}
Status:     ${invoice.status.toUpperCase()}

Patient:    ${invoice.patientName}
Service:    ${invoice.service}

TOTAL AMOUNT: ₹${invoice.amount.toFixed(2)}

-------------------------
Thank you for choosing MediCare Hospital.
        `;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${invoice.id}-${invoice.patientName.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const filteredInvoices = invoices.filter(inv =>
        inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate stats
    const pendingInvoices = invoices.filter(inv => inv.status === 'Pending');
    const totalPendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
    const totalPaidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const unpaidInvoices = invoices.filter(inv => inv.status === 'Unpaid');
    const totalUnpaidAmount = unpaidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalRevenue = totalPaidAmount + totalPendingAmount + totalUnpaidAmount;

    const statusData = [
        { name: 'Paid', value: paidInvoices.length, amount: totalPaidAmount, color: '#10B981' },
        { name: 'Pending', value: pendingInvoices.length, amount: totalPendingAmount, color: '#F59E0B' },
        { name: 'Unpaid', value: unpaidInvoices.length, amount: totalUnpaidAmount, color: '#EF4444' },
    ];

    // Get status styles
    const getStatusStyle = (status: string): { bg: string; color: string; icon: typeof CheckCircle } => {
        const styles: Record<string, { bg: string; color: string; icon: typeof CheckCircle }> = {
            Paid: { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', color: '#15803d', icon: CheckCircle },
            Pending: { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', color: '#b45309', icon: Clock },
            Unpaid: { bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', color: '#dc2626', icon: AlertCircle },
        };
        return styles[status] || styles.Pending;
    };

    // Get avatar color
    const getAvatarColor = (name: string): string => {
        const colors = [
            'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
            'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
            'linear-gradient(135deg, #059669 0%, #34d399 100%)',
            'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
        ];
        return colors[name.charCodeAt(0) % colors.length];
    };

    return (
        <Layout>
            {/* Page Header */}
            <div style={{
                background: 'linear-gradient(135deg, #0d1628 0%, #0f2044 45%, #0c253d 100%)',
                borderRadius: '20px',
                padding: '32px',
                marginBottom: '24px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(37,99,235,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                }} />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Receipt size={28} color="white" />
                        </div>
                        <div>
                            <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 700, margin: 0 }}>
                                Billing & Revenue
                            </h1>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', margin: '6px 0 0' }}>
                                Manage invoices and track payments
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'white',
                            color: '#059669',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                        }}
                    >
                        <Plus size={18} /> Create Invoice
                    </button>
                </div>
            </div>

            {/* Search Section */}
            <div style={{
                background: colors.surface,
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
                border: `1px solid ${colors.border}`,
            }}>
                <div style={{ maxWidth: '400px' }}>
                    <Input
                        leftIcon={Search}
                        placeholder="Search by patient name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '24px',
            }}>
                {[
                    { label: 'Total Revenue', value: `₹${totalRevenue.toFixed(0)}`, icon: IndianRupee, color: '#9333ea', trend: '+12.8%' },
                    { label: 'Paid', value: `₹${totalPaidAmount.toFixed(0)}`, icon: CheckCircle, color: '#15803d', count: paidInvoices.length },
                    { label: 'Pending', value: `₹${totalPendingAmount.toFixed(0)}`, icon: Clock, color: '#d97706', count: pendingInvoices.length },
                    { label: 'Unpaid', value: `₹${totalUnpaidAmount.toFixed(0)}`, icon: AlertCircle, color: '#dc2626', count: unpaidInvoices.length },
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} style={{
                            background: colors.surface,
                            borderRadius: '16px',
                            padding: '20px',
                            border: `1px solid ${colors.border}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: `${stat.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Icon size={22} color={stat.color} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>{stat.label}</p>
                                <p style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 700, color: colors.textPrimary }}>
                                    {stat.value}
                                </p>
                            </div>
                            {stat.trend && (
                                <div style={{
                                    padding: '4px 10px',
                                    background: '#dcfce7',
                                    borderRadius: '9999px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}>
                                    <TrendingUp size={12} color="#15803d" />
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#15803d' }}>{stat.trend}</span>
                                </div>
                            )}
                            {stat.count !== undefined && (
                                <span style={{
                                    padding: '4px 12px',
                                    background: `${stat.color}15`,
                                    borderRadius: '9999px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: stat.color,
                                }}>
                                    {stat.count}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6 items-stretch">
                <RevenueChart />
                <BillingTable data={statusData.map((s, i) => ({
                    id: String(i),
                    status: s.name as 'Paid' | 'Pending' | 'Unpaid',
                    count: s.value,
                    amount: s.amount,
                    percentage: totalRevenue > 0 ? Math.round((s.amount / totalRevenue) * 100) : 0
                }))} />
            </div>

            {/* Invoices Table */}
            <div style={{
                background: colors.surface,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: colors.shadow,
                border: `1px solid ${colors.border}`,
            }}>
                {/* Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '0.8fr 1.5fr 1.2fr 0.8fr 0.8fr 0.8fr 0.6fr',
                    gap: '16px',
                    padding: '16px 24px',
                    background: resolvedTheme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : '#f9fafb',
                    borderBottom: `1px solid ${colors.border}`,
                }}>
                    {['Invoice ID', 'Patient', 'Service', 'Date', 'Amount', 'Status', 'Actions'].map((header) => (
                        <span key={header} style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: colors.textSecondary,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}>
                            {header}
                        </span>
                    ))}
                </div>

                {/* Table Body */}
                {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => {
                        const statusStyle = getStatusStyle(invoice.status);
                        const StatusIcon = statusStyle.icon;

                        return (
                            <div
                                key={invoice.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '0.8fr 1.5fr 1.2fr 0.8fr 0.8fr 0.8fr 0.6fr',
                                    gap: '16px',
                                    padding: '16px 24px',
                                    borderBottom: `1px solid ${colors.border}`,
                                    background: hoveredRow === invoice.id ? colors.surfaceHover : 'transparent',
                                    alignItems: 'center',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={() => setHoveredRow(invoice.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                {/* Invoice ID */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FileText size={16} color={colors.textMuted} />
                                    <span style={{ fontWeight: 600, color: '#2563eb', fontSize: '14px' }}>
                                        {invoice.id}
                                    </span>
                                </div>

                                {/* Patient */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: getAvatarColor(invoice.patientName),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '11px',
                                    }}>
                                        {invoice.patientName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </div>
                                    <span style={{ fontWeight: 500, color: colors.textPrimary }}>{invoice.patientName}</span>
                                </div>

                                {/* Service */}
                                <span style={{ color: colors.textSecondary, fontSize: '13px' }}>{invoice.service}</span>

                                {/* Date */}
                                <span style={{ color: colors.textSecondary, fontSize: '13px' }}>{invoice.date}</span>

                                {/* Amount */}
                                <span style={{ fontWeight: 700, color: colors.textPrimary, fontSize: '14px' }}>
                                    ₹{invoice.amount.toFixed(2)}
                                </span>

                                {/* Status */}
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '5px 10px',
                                    borderRadius: '9999px',
                                    background: statusStyle.bg,
                                    width: 'fit-content',
                                }}>
                                    <StatusIcon size={12} color={statusStyle.color} />
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: statusStyle.color }}>
                                        {invoice.status}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => handleOpenModal(invoice)}
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '6px',
                                            background: '#dbeafe',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Edit2 size={12} color="#2563eb" />
                                    </button>
                                    <button
                                        onClick={() => handlePrint(invoice)}
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '6px',
                                            background: '#dcfce7',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Download size={12} color="#15803d" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{
                        padding: '48px',
                        textAlign: 'center',
                        color: colors.textSecondary,
                    }}>
                        <Receipt size={48} color={resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'} style={{ marginBottom: '12px' }} />
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>No invoices found</p>
                        <p style={{ margin: '8px 0 0', fontSize: '13px' }}>Try a different search or create a new invoice</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
                subtitle={editingInvoice ? 'Update invoice details' : 'Generate a new patient invoice'}
            >
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Input
                        label="Patient Name"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        required
                        fullWidth
                    />
                    <Input
                        label="Service / Description"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        placeholder="e.g. Annual Checkup"
                        required
                        fullWidth
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Input
                            label="Amount (₹)"
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                            required
                            fullWidth
                        />
                        <Input
                            label="Date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                            fullWidth
                        />
                    </div>
                    <Select
                        label="Status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Invoice['status'] })}
                        options={[
                            { value: 'Paid', label: 'Paid' },
                            { value: 'Pending', label: 'Pending' },
                            { value: 'Unpaid', label: 'Unpaid' }
                        ]}
                        fullWidth
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">{editingInvoice ? 'Update Invoice' : 'Generate Invoice'}</Button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Billing;
