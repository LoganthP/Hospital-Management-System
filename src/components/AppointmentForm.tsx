import React, { useState, useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { useHospital } from '../context/HospitalContext';
import type { Appointment } from '../context/HospitalContext';

interface AppointmentFormProps {
    initialData?: Appointment;
    onSubmit: (data: Omit<Appointment, 'id'>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
    const { patients, doctors, colors } = useHospital();
    const [formData, setFormData] = useState<Omit<Appointment, 'id'>>({
        patientId: '',
        doctorId: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        status: 'Scheduled',
        notes: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                patientId: initialData.patientId,
                doctorId: initialData.doctorId,
                date: initialData.date,
                time: initialData.time,
                status: initialData.status,
                notes: initialData.notes || '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const patientOptions = patients.map(p => ({ value: p.id, label: p.name }));
    const doctorOptions = doctors.map(d => ({ value: d.id, label: `${d.name} (${d.specialization})` }));

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Select
                label="Patient"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                options={patientOptions}
                required
                fullWidth
            />

            <Select
                label="Doctor"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                options={doctorOptions}
                required
                fullWidth
            />

            <div style={{ display: 'flex', gap: '16px' }}>
                <Input
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Input
                    label="Time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    fullWidth
                />
            </div>

            <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                    { value: 'Scheduled', label: 'Scheduled' },
                    { value: 'Completed', label: 'Completed' },
                    { value: 'Cancelled', label: 'Cancelled' }
                ]}
                fullWidth
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: colors.textPrimary,
                }}>
                    Notes
                </label>
                <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Reason for visit, symptoms, etc."
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `1.5px solid ${colors.border}`,
                        background: colors.inputBg,
                        color: colors.textPrimary,
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        resize: 'vertical',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.15)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = colors.border;
                        e.target.style.boxShadow = 'none';
                    }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'end', gap: '12px', marginTop: '12px' }}>
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                    {initialData ? 'Update Appointment' : 'Schedule Appointment'}
                </Button>
            </div>
        </form>
    );
};

export default AppointmentForm;
