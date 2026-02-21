import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import { Mail, Lock, User, ArrowRight, HeartPulse, Sun, Moon } from 'lucide-react';
import '../styles/auth.css';

// Auth sub-components
import AuthInputField from '../components/auth/AuthInputField';
import AuthTabs from '../components/auth/AuthTabs';
import RoleSelector from '../components/auth/RoleSelector';
import MedicalIllustration from '../components/auth/MedicalIllustration';
import SecureBadge from '../components/auth/SecureBadge';

// ─── Types ───────────────────────────────────────────────────────────
type Tab = 'signin' | 'signup';
type Role = 'Admin' | 'Doctor' | 'Nurse' | 'Patient';

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

// ─── Validation ──────────────────────────────────────────────────────
const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password: string) =>
    password.length >= 6;

// ─── Component ───────────────────────────────────────────────────────
const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, resolvedTheme, setTheme } = useHospital();

    // Form state
    const [activeTab, setActiveTab] = useState<Tab>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<Role>('Doctor');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    // Toggle theme between light and dark
    const isDark = resolvedTheme === 'dark';
    const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

    // Switch tabs — reset errors and form state
    const handleTabChange = useCallback((tab: Tab) => {
        setActiveTab(tab);
        setErrors({});
        setSubmitSuccess(false);
    }, []);

    // Validate before submit
    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (activeTab === 'signup' && !name.trim()) {
            newErrors.name = 'Full name is required.';
        }
        if (!email.trim()) {
            newErrors.email = 'Email address is required.';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 6 characters.';
        }
        if (activeTab === 'signup' && password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit handler — preserves all backend/auth logic unchanged
    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        setSubmitSuccess(false);

        setTimeout(() => {
            if (activeTab === 'signin') {
                login({
                    id: 'u1',
                    name: 'Dr. Sarah Smith',
                    email: email || 'sarah.smith@hospital.com',
                    role: 'Admin',
                    avatar:
                        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
                });
            } else {
                login({
                    id: Date.now().toString(),
                    name: name || 'New User',
                    email,
                    role,
                    avatar:
                        role === 'Patient'
                            ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300&h=300'
                            : 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
                });
            }
            setIsLoading(false);
            setSubmitSuccess(true);
            setTimeout(() => navigate('/'), 500);
        }, 1400);
    };

    // ── Styles ────────────────────────────────────────────────────────
    const PAGE_STYLE: React.CSSProperties = {
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #0c1a3d 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    };

    return (
        <div style={PAGE_STYLE} className="auth-page">
            {/* ── Ambient background glows ───────────────────────────── */}
            <div style={GLOW_STYLE(false)} />
            <div style={GLOW_STYLE(true)} />
            <div style={GLOW_CENTER_STYLE} />

            {/* ── Dark/Light Mode Toggle (top-right) ────────────────── */}
            <button
                onClick={toggleTheme}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="auth-focus-ring"
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 100,
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s',
                }}
            >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* ════════════════════════════════════════════════════════════
          SPLIT SCREEN LAYOUT
          Left = Illustration panel  |  Right = Auth card
          ══════════════════════════════════════════════════════════ */}
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    minHeight: '100vh',
                    alignItems: 'center',
                }}
            >
                {/* ── LEFT PANEL — Branding & Illustration ───────────────── */}
                <div
                    className="auth-split-left auth-left-enter"
                    style={{
                        flex: '1 1 0',
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '1px solid rgba(255,255,255,0.06)',
                        position: 'relative',
                    }}
                >
                    <MedicalIllustration />
                </div>

                {/* ── RIGHT PANEL — Auth Card ─────────────────────────────── */}
                <div
                    style={{
                        flex: '0 0 auto',
                        width: '100%',
                        maxWidth: '520px',
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px 20px',
                    }}
                >
                    <div
                        className="auth-split-right auth-card-enter auth-card-scroll"
                        style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(32px)',
                            WebkitBackdropFilter: 'blur(32px)',
                            borderRadius: '28px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset',
                            padding: '40px 36px',
                            maxHeight: '96vh',
                        }}
                    >
                        {/* ── Card Header ──────────────────────────────────── */}
                        <CardHeader activeTab={activeTab} />

                        {/* ── Tab Switcher ─────────────────────────────────── */}
                        <div style={{ margin: '24px 0 28px' }}>
                            <AuthTabs activeTab={activeTab} onChange={handleTabChange} />
                        </div>

                        {/* ── Form ─────────────────────────────────────────── */}
                        <form
                            ref={formRef}
                            onSubmit={handleAuth}
                            noValidate
                            aria-label={activeTab === 'signin' ? 'Sign in form' : 'Sign up form'}
                            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                        >
                            {/* Name field (sign up only) */}
                            {activeTab === 'signup' && (
                                <div className="auth-form-active">
                                    <AuthInputField
                                        label="Full Name"
                                        leftIcon={User}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        error={errors.name}
                                        placeholder=""
                                        autoComplete="name"
                                        required
                                    />
                                </div>
                            )}

                            {/* Role selector (sign up only) */}
                            {activeTab === 'signup' && (
                                <div className="auth-form-active">
                                    <RoleSelector selected={role} onChange={setRole} />
                                </div>
                            )}

                            {/* Email */}
                            <AuthInputField
                                label="Email Address"
                                leftIcon={Mail}
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                error={errors.email}
                                placeholder=""
                                autoComplete={activeTab === 'signin' ? 'email' : 'new-email'}
                                required
                            />

                            {/* Password */}
                            <div>
                                <AuthInputField
                                    label="Password"
                                    leftIcon={Lock}
                                    showPasswordToggle
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    error={errors.password}
                                    hint={activeTab === 'signup' ? 'Minimum 6 characters' : undefined}
                                    placeholder=""
                                    autoComplete={activeTab === 'signin' ? 'current-password' : 'new-password'}
                                    required
                                />
                                {/* Forgot password (sign in only) */}
                                {activeTab === 'signin' && !errors.password && (
                                    <div style={{ textAlign: 'right', marginTop: '6px' }}>
                                        <button
                                            type="button"
                                            className="auth-focus-ring"
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                color: '#60a5fa',
                                                cursor: 'pointer',
                                                padding: '2px 0',
                                                fontFamily: 'inherit',
                                                letterSpacing: '0.01em',
                                            }}
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password (sign up only) */}
                            {activeTab === 'signup' && (
                                <div className="auth-form-active">
                                    <AuthInputField
                                        label="Confirm Password"
                                        leftIcon={Lock}
                                        showPasswordToggle
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        error={errors.confirmPassword}
                                        placeholder=""
                                        autoComplete="new-password"
                                        required
                                    />
                                </div>
                            )}

                            {/* Remember Me (sign in only) */}
                            {activeTab === 'signin' && (
                                <label
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={e => setRememberMe(e.target.checked)}
                                        className="auth-checkbox auth-focus-ring"
                                        aria-label="Remember me"
                                    />
                                    <span style={{
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: 'rgba(255,255,255,0.55)',
                                    }}>
                                        Remember me for 30 days
                                    </span>
                                </label>
                            )}

                            {/* Submit Button */}
                            <SubmitButton
                                activeTab={activeTab}
                                isLoading={isLoading}
                                isSuccess={submitSuccess}
                            />
                        </form>

                        {/* ── Secure Badge ─────────────────────────────────── */}
                        <div style={{ marginTop: '24px' }}>
                            <SecureBadge />
                        </div>

                        {/* ── Footer ───────────────────────────────────────── */}
                        <footer style={{
                            marginTop: '20px',
                            textAlign: 'center',
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.28)',
                            lineHeight: 1.7,
                        }}>
                            By continuing, you agree to our{' '}
                            <a
                                href="#"
                                style={{ color: 'rgba(96,165,250,0.7)', textDecoration: 'none', fontWeight: 500 }}
                                onClick={e => e.preventDefault()}
                            >
                                Terms of Service
                            </a>
                            {' '}and{' '}
                            <a
                                href="#"
                                style={{ color: 'rgba(96,165,250,0.7)', textDecoration: 'none', fontWeight: 500 }}
                                onClick={e => e.preventDefault()}
                            >
                                Privacy Policy
                            </a>
                        </footer>
                    </div>
                </div>
            </div>

            {/* ── Footer Watermark ───────────────────────────────────────── */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    bottom: '18px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    color: 'rgba(255,255,255,0.2)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                }}
            >
                <HeartPulse size={13} className="auth-heartbeat" />
                MediCare HMS v2.4
            </div>
        </div>
    );
};

// ─── Sub-components (colocated for performance) ──────────────────────

const CardHeader: React.FC<{ activeTab: Tab }> = ({ activeTab }) => (
    <div style={{ textAlign: 'center' }}>
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                boxShadow: '0 8px 20px rgba(37,99,235,0.45)',
                marginBottom: '16px',
            }}
        >
            <HeartPulse size={26} color="white" />
        </div>
        <h1
            style={{
                fontSize: '22px',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.03em',
                margin: '0 0 6px',
            }}
        >
            {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p
            style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                margin: 0,
                fontWeight: 400,
            }}
        >
            {activeTab === 'signin'
                ? 'Sign in to access your medical dashboard'
                : 'Join MediCare — it takes less than a minute'}
        </p>
    </div>
);

const SubmitButton: React.FC<{
    activeTab: Tab;
    isLoading: boolean;
    isSuccess: boolean;
}> = ({ activeTab, isLoading, isSuccess }) => {
    const [hovered, setHovered] = useState(false);

    const bgColor = isSuccess
        ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
        : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';

    const glowColor = isSuccess
        ? 'rgba(5,150,105,0.45)'
        : 'rgba(37,99,235,0.5)';

    return (
        <button
            type="submit"
            disabled={isLoading || isSuccess}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="auth-focus-ring"
            aria-label={
                isLoading
                    ? 'Processing...'
                    : isSuccess
                        ? 'Success!'
                        : activeTab === 'signin'
                            ? 'Sign In'
                            : 'Create Account'
            }
            style={{
                width: '100%',
                padding: '15px 24px',
                borderRadius: '14px',
                border: 'none',
                background: bgColor,
                color: 'white',
                fontSize: '15px',
                fontWeight: 700,
                cursor: isLoading || isSuccess ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                letterSpacing: '0.01em',
                fontFamily: 'inherit',
                transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
                transform: hovered && !isLoading && !isSuccess ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hovered && !isLoading && !isSuccess
                    ? `0 12px 30px ${glowColor}`
                    : `0 6px 18px ${isSuccess ? 'rgba(5,150,105,0.35)' : 'rgba(37,99,235,0.35)'}`,
                opacity: isLoading ? 0.85 : 1,
                marginTop: '4px',
            }}
        >
            {isLoading ? (
                <>
                    <svg
                        className="auth-spin"
                        width="18" height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Processing...
                </>
            ) : isSuccess ? (
                <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Success!
                </>
            ) : (
                <>
                    {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={18} aria-hidden="true" />
                </>
            )}
        </button>
    );
};

// ─── Background glow helpers ─────────────────────────────────────────

const GLOW_STYLE = (isBottom: boolean): React.CSSProperties => ({
    position: 'absolute',
    ...(isBottom
        ? { bottom: '-100px', left: '-50px' }
        : { top: '-100px', right: '-80px' }
    ),
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: isBottom
        ? 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 65%)'
        : 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%)',
    pointerEvents: 'none',
});

const GLOW_CENTER_STYLE: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
};

export default Login;
