import React, { useState, useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { useHospital, type Patient } from '../context/HospitalContext';

interface PatientFormProps {
    initialData?: Patient;
    onSubmit: (data: Omit<Patient, 'id'>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
    const { colors } = useHospital();
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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
            />

            <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                    <Input
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                </div>
                <div style={{ flex: 1 }}>
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
            </div>

            <Input
                label="Contact Number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                fullWidth
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: colors.textPrimary,
                }}>
                    Medical History
                </label>
                <textarea
                    name="history"
                    rows={4}
                    value={formData.history}
                    onChange={handleChange}
                    placeholder="Previous conditions, allergies, etc."
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

            <Input
                label="Last Visit"
                name="lastVisit"
                type="date"
                value={formData.lastVisit}
                onChange={handleChange}
                fullWidth
            />

            <div style={{ display: 'flex', justifyContent: 'end', gap: '12px', marginTop: '12px' }}>
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
