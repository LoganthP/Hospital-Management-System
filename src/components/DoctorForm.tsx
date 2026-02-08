import React, { useState, useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { type Doctor } from '../context/HospitalContext';

interface DoctorFormProps {
    initialData?: Doctor;
    onSubmit: (data: Omit<Doctor, 'id'>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
    const [formData, setFormData] = useState<Omit<Doctor, 'id'>>({
        name: '',
        specialization: 'General',
        contact: '',
        availability: 'Available',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                specialization: initialData.specialization,
                contact: initialData.contact,
                availability: initialData.availability,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                label="Doctor Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
            />

            <div className="flex gap-4">
                <Select
                    label="Specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    options={[
                        { value: 'Cardiology', label: 'Cardiology' },
                        { value: 'Neurology', label: 'Neurology' },
                        { value: 'Pediatrics', label: 'Pediatrics' },
                        { value: 'Dermatology', label: 'Dermatology' },
                        { value: 'General', label: 'General Practice' },
                        { value: 'Orthopedics', label: 'Orthopedics' }
                    ]}
                    fullWidth
                />
                <Select
                    label="Availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    options={[
                        { value: 'Available', label: 'Available' },
                        { value: 'Busy', label: 'Busy' },
                        { value: 'Off-Duty', label: 'Off-Duty' }
                    ]}
                    fullWidth
                />
            </div>

            <Input
                label="Contact Number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                fullWidth
            />

            <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                    {initialData ? 'Update Doctor' : 'Add Doctor'}
                </Button>
            </div>
        </form>
    );
};

export default DoctorForm;
