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
    const { patients, doctors } = useHospital();
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

            <div className="flex gap-4">
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

            <div className="form-group w-full">
                <label className="form-label">Notes</label>
                <textarea
                    className="form-textarea"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Reason for visit, symptoms, etc."
                />
            </div>

            <div className="flex justify-end gap-3 mt-4">
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
