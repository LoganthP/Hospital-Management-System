// This is a mock AI service that simulates generating a prescription based on symptoms
// In a real application, this would call an backend API (e.g., OpenAI, Gemini, etc.)

export interface PrescriptionRecommendation {
    medications: {
        name: string;
        dosage: string;
        frequency: string;
        duration: string;
        notes?: string;
    }[];
    advice: string[];
    diagnosis: string;
}

export const generatePrescription = async (symptoms: string, _age: number, _gender: string): Promise<PrescriptionRecommendation> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerSymptoms = symptoms.toLowerCase();

    // Simple rule-based mock logic
    if (lowerSymptoms.includes('headache') || lowerSymptoms.includes('fever')) {
        return {
            diagnosis: 'Viral Fever / Common Cold',
            medications: [
                { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6-8 hours', duration: '3-5 days', notes: 'Take after food' },
                { name: 'Cetirizine', dosage: '10mg', frequency: 'Once a day', duration: '5 days', notes: 'May cause drowsiness' }
            ],
            advice: [
                'Drink plenty of fluids',
                'Rest well',
                'Monitor temperature regularly'
            ]
        };
    }

    if (lowerSymptoms.includes('stomach') || lowerSymptoms.includes('pain') || lowerSymptoms.includes('vomit')) {
        return {
            diagnosis: 'Gastritis / Food Poisoning',
            medications: [
                { name: 'Omeprazole', dosage: '20mg', frequency: 'Once a day (Morning)', duration: '7 days', notes: 'Take empty stomach' },
                { name: 'Domperidone', dosage: '10mg', frequency: 'As needed', duration: '3 days', notes: 'For nausea' }
            ],
            advice: [
                'Avoid spicy and oily food',
                'Stay hydrated with ORS',
                'Eat light meals'
            ]
        };
    }

    if (lowerSymptoms.includes('cough') || lowerSymptoms.includes('chest')) {
        return {
            diagnosis: 'Upper Respiratory Tract Infection',
            medications: [
                { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times a day', duration: '5 days', notes: 'Complete full course' },
                { name: 'Cough Syrup', dosage: '10ml', frequency: 'Three times a day', duration: '5 days', notes: 'Shake well before use' }
            ],
            advice: [
                'Steam inhalation twice a day',
                'Salt water gargle',
                'Avoid cold drinks'
            ]
        };
    }

    // Default / Generic fallback
    return {
        diagnosis: 'General Health Check Required',
        medications: [
            { name: 'Multivitamin', dosage: '1 tab', frequency: 'Once a day', duration: '15 days', notes: 'General supplement' }
        ],
        advice: [
            'Consult a specialist if symptoms persist',
            'Maintain a balanced diet',
            'Regular exercise'
        ]
    };
};
