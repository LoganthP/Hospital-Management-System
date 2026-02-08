import React, { useState, useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { type Patient } from '../context/HospitalContext';

interface PatientFormProps {
    initialData?: Patient;
    onSubmit: (data: Omit<Patient, 'id'>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
    const [formData, setFormData] = useState<Omit<Patient, 'id'>>({
        name: '',
        age: 0,
        gender: 'Male',
        contact: '',
        history: '',
        lastVisit: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                age: initialData.age,
                gender: initialData.gender,
                contact: initialData.contact,
                history: initialData.history,
                lastVisit: initialData.lastVisit,
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

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
            />

            <div className="flex gap-4">
                <Input
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full"
                />
                <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Other', label: 'Other' }
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

            <div className="form-group w-full">
                <label className="form-label">Medical History</label>
                <textarea
                    className="form-textarea"
                    name="history"
                    rows={3}
                    value={formData.history}
                    onChange={handleChange}
                    placeholder="Previous conditions, allergies, etc."
                />
            </div>

            <Input
                label="Last Visit"
                name="lastVisit"
                type="date"
                value={formData.lastVisit}
                onChange={handleChange}
                fullWidth
            />

            <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                    {initialData ? 'Update Patient' : 'Add Patient'}
                </Button>
            </div>
        </form>
    );
};

export default PatientForm;
