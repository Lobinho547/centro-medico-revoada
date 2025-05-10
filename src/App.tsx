import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme, IconButton, PaletteMode } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Logo from './components/Logo';
import Dashboard from './pages/Dashboard';
import MedicalSpecialties from './pages/MedicalSpecialties';
import Recruitment from './pages/Recruitment';
import Psychotechnical from './pages/Psychotechnical';
import EagleCourse from './pages/EagleCourse';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import Surgeries from './pages/Surgeries';
import RegistrationRequests from './pages/RegistrationRequests';
import UserManagement from './pages/UserManagement';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const colorMode = useContext(ColorModeContext);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {localStorage.getItem('theme') === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Logo />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/medical-specialties" element={<MedicalSpecialties />} />
          <Route path="/psychotechnical" element={<Psychotechnical />} />
          <Route path="/eagle-course" element={<EagleCourse />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/surgeries" element={<Surgeries />} />
          <Route path="/registration-requests" element={<RegistrationRequests />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode: PaletteMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
