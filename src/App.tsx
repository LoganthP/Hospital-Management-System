import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HospitalProvider } from './context/HospitalContext';
import Dashboard from './pages/Dashboard';
import './index.css';

// Placeholder pages for routes I haven't implemented yet, to avoid router errors
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import AIPrescription from './pages/AIPrescription';
import Billing from './pages/Billing';
import HospitalGuide from './pages/HospitalGuide';
import WardManagement from './pages/WardManagement';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { useHospital } from './context/HospitalContext';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useHospital();
  const location = useLocation();

  if (!currentUser) {
    if (location.pathname !== '/login') {
      window.location.href = '/login';
      return null;
    }
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <HospitalProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/patients" element={<AuthGuard><Patients /></AuthGuard>} />
          <Route path="/doctors" element={<AuthGuard><Doctors /></AuthGuard>} />
          <Route path="/appointments" element={<AuthGuard><Appointments /></AuthGuard>} />
          <Route path="/ai-prescription" element={<AuthGuard><AIPrescription /></AuthGuard>} />
          <Route path="/billing" element={<AuthGuard><Billing /></AuthGuard>} />
          <Route path="/guide" element={<AuthGuard><HospitalGuide /></AuthGuard>} />
          <Route path="/wards" element={<AuthGuard><WardManagement /></AuthGuard>} />
          <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
        </Routes>
      </HospitalProvider>
    </Router>
  );
}

export default App;
