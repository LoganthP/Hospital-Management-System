import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { generatePrescription, type PrescriptionRecommendation } from '../services/aiService';
import { useHospital } from '../context/HospitalContext';
import { Brain, Loader2, Sparkles, CheckCircle, AlertCircle, Pill, Activity, Heart, Download } from 'lucide-react';

const AIPrescription = () => {
    const { resolvedTheme, colors } = useHospital();
    const [symptoms, setSymptoms] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [patientGender, setPatientGender] = useState('Male');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<PrescriptionRecommendation | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!symptoms) return;

        setIsLoading(true);
        setResult(null);

        try {
            const prediction = await generatePrescription(symptoms, Number(patientAge), patientGender);
            setResult(prediction);
        } catch (error) {
            console.error("AI Generation failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = () => {
        if (!result) return;

        const date = new Date().toLocaleDateString();
        const meds = result.medications.map(m =>
            `- ${m.name} (${m.dosage})\n  Freq: ${m.frequency}, Duration: ${m.duration}\n  Note: ${m.notes}`
        ).join('\n\n');

        const advice = result.advice.map(a => `- ${a}`).join('\n');

        const content = `
MEDICARE HOSPITAL - AI PRESCRIPTION
-----------------------------------
Date:       ${date}
Patient:    ${patientAge} yrs, ${patientGender}
Symptoms:   ${symptoms}

DIAGNOSIS
---------
${result.diagnosis}

RX MEDICATIONS
--------------
${meds}

CLINICAL ADVICE
---------------
${advice}

-----------------------------------
Disclaimer: AI-generated suggestion. 
Review by a certified doctor before use.
        `;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Prescription-${new Date().getTime()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
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
                {/* Decorative elements */}
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
                    position: 'absolute',
                    bottom: '-20px',
                    left: '30%',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                }} />

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Sparkles size={28} color="white" />
                    </div>
                    <div>
                        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 700, margin: 0 }}>
                            AI Prescription Assistant
                        </h1>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', margin: '6px 0 0' }}>
                            Get intelligent medication recommendations powered by AI
                        </p>
                    </div>
                </div>

                {/* Warning Banner */}
                <div style={{
                    marginTop: '20px',
                    padding: '12px 16px',
                    background: 'rgba(251, 191, 36, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                }}>
                    <AlertCircle size={18} color="#fbbf24" />
                    <span style={{ color: 'white', fontSize: '13px' }}>
                        <strong>Disclaimer:</strong> This is an AI tool. Always review prescriptions before printing.
                    </span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '24px',
            }}>
                {/* Patient Details & Symptoms Form */}
                <div style={{
                    background: colors.surface,
                    borderRadius: '20px',
                    padding: '24px',
                    border: `1px solid ${colors.border}`,
                    height: 'fit-content',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                        paddingBottom: '16px',
                        borderBottom: `1px solid ${colors.border}`,
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Activity size={20} color="#2563eb" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>
                                Patient Details & Symptoms
                            </h2>
                            <p style={{ margin: '2px 0 0', fontSize: '13px', color: colors.textSecondary }}>
                                Enter patient information for analysis
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                            <Input
                                label="Patient Age"
                                type="number"
                                value={patientAge}
                                onChange={(e) => setPatientAge(e.target.value)}
                                placeholder="e.g. 25"
                                required
                                fullWidth
                            />
                            <Select
                                label="Gender"
                                value={patientGender}
                                onChange={(e) => setPatientGender(e.target.value)}
                                options={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                    { value: 'Other', label: 'Other' }
                                ]}
                                fullWidth
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: colors.textPrimary,
                                marginBottom: '8px',
                            }}>
                                Symptoms & Observations
                            </label>
                            <textarea
                                rows={6}
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                                placeholder="Describe the patient's symptoms, e.g., 'Severe headache, mild fever, sore throat since 2 days'..."
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: `1px solid ${colors.border}`,
                                    background: colors.inputBg,
                                    color: colors.textPrimary,
                                    fontSize: '14px',
                                    resize: 'vertical',
                                    transition: 'all 0.2s',
                                    outline: 'none',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#2563eb';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = colors.border;
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            fullWidth
                            style={{
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                padding: '14px',
                                borderRadius: '12px',
                                fontSize: '15px',
                                fontWeight: 600,
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing Symptoms...
                                </>
                            ) : (
                                <>
                                    <Brain size={18} /> Generate AI Prescription
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* AI Recommendation Result */}
                <div>
                    {result ? (
                        <div style={{
                            background: colors.surface,
                            borderRadius: '20px',
                            padding: '24px',
                            border: `1px solid ${colors.border}`,
                            borderTop: '4px solid #2563eb',
                        }}>
                            {/* Header */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '20px',
                                paddingBottom: '16px',
                                borderBottom: `1px solid ${colors.border}`,
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <CheckCircle size={20} color="#15803d" />
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>
                                            AI Recommendation
                                        </h3>
                                    </div>
                                    <div style={{
                                        marginTop: '10px',
                                        padding: '8px 14px',
                                        background: resolvedTheme === 'dark' ? 'rgba(37, 99, 235, 0.2)' : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                                        borderRadius: '8px',
                                        display: 'inline-block',
                                        border: resolvedTheme === 'dark' ? '1px solid rgba(37, 99, 235, 0.3)' : 'none',
                                    }}>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: resolvedTheme === 'dark' ? '#60a5fa' : '#2563eb' }}>
                                            Diagnosis: {result.diagnosis}
                                        </span>
                                    </div>
                                </div>
                                <span style={{
                                    padding: '4px 10px',
                                    background: '#dcfce7',
                                    borderRadius: '9999px',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    color: '#15803d',
                                }}>
                                    Verified
                                </span>
                            </div>

                            {/* Medications */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '14px',
                                }}>
                                    <Pill size={16} color="#2563eb" />
                                    <h4 style={{
                                        margin: 0,
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: colors.textSecondary,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}>
                                        RX Medications
                                    </h4>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {result.medications.map((med, idx) => (
                                        <div key={idx} style={{
                                            background: colors.inputBg,
                                            padding: '16px',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <div>
                                                <p style={{
                                                    margin: 0,
                                                    fontWeight: 700,
                                                    color: colors.textPrimary,
                                                    fontSize: '15px',
                                                }}>
                                                    {med.name}
                                                    <span style={{
                                                        marginLeft: '8px',
                                                        fontWeight: 500,
                                                        color: colors.textSecondary,
                                                        fontSize: '13px',
                                                    }}>
                                                        ({med.dosage})
                                                    </span>
                                                </p>
                                                <p style={{
                                                    margin: '6px 0 0',
                                                    fontSize: '12px',
                                                    color: colors.textSecondary,
                                                }}>
                                                    {med.notes}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{
                                                    margin: 0,
                                                    fontWeight: 600,
                                                    color: colors.textPrimary,
                                                    fontSize: '14px',
                                                }}>
                                                    {med.frequency}
                                                </p>
                                                <p style={{
                                                    margin: '4px 0 0',
                                                    fontSize: '12px',
                                                    color: colors.textSecondary,
                                                }}>
                                                    {med.duration}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Clinical Advice */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '14px',
                                }}>
                                    <Heart size={16} color="#dc2626" />
                                    <h4 style={{
                                        margin: 0,
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        color: colors.textSecondary,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}>
                                        Clinical Advice
                                    </h4>
                                </div>
                                <div style={{
                                    background: resolvedTheme === 'dark' ? 'rgba(15, 23, 42, 0.4)' : 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: resolvedTheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                                }}>
                                    <ul style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                    }}>
                                        {result.advice.map((advice, idx) => (
                                            <li key={idx} style={{
                                                fontSize: '14px',
                                                color: resolvedTheme === 'dark' ? colors.textPrimary : '#374151',
                                            }}>
                                                {advice}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <Button variant="ghost" fullWidth onClick={handlePrint} style={{ padding: '12px' }}>
                                    <Download size={16} /> Download Rx
                                </Button>
                                <Button variant="secondary" fullWidth onClick={() => setResult(null)} style={{ padding: '12px' }}>
                                    New Consultation
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            height: '100%',
                            minHeight: '400px',
                            background: resolvedTheme === 'dark' ? 'rgba(31, 41, 55, 0.3)' : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                            borderRadius: '20px',
                            border: `2px dashed ${colors.border}`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '32px',
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px',
                            }}>
                                <Brain size={40} color="#2563eb" style={{ opacity: 0.5 }} />
                            </div>
                            <h3 style={{
                                margin: 0,
                                fontSize: '20px',
                                fontWeight: 700,
                                color: colors.textSecondary,
                            }}>
                                Ready to Assist
                            </h3>
                            <p style={{
                                margin: '12px 0 0',
                                fontSize: '14px',
                                color: colors.textSecondary,
                                maxWidth: '280px',
                            }}>
                                Enter patient symptoms on the left to get instant AI-powered medication and diagnosis recommendations.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AIPrescription;
