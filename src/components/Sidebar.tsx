import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalHospital as MedicalSpecialtiesIcon,
  Work as RecruitmentIcon,
  Psychology as PsychotechnicalIcon,
  School as EagleCourseIcon,
  AdminPanelSettings as AdminPanelIcon,
  MedicalServices as SurgeriesIcon,
  Assignment as RegistrationRequestsIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Especialidades', icon: <MedicalSpecialtiesIcon />, path: '/medical-specialties' },
  { text: 'Psicotécnico', icon: <PsychotechnicalIcon />, path: '/psychotechnical' },
  { text: 'Curso Águia', icon: <EagleCourseIcon />, path: '/eagle-course' },
  { text: 'Cirurgias', icon: <SurgeriesIcon />, path: '/surgeries' },
  { text: 'Solicitações', icon: <RegistrationRequestsIcon />, path: '/registration-requests' },
  { text: 'Painel Admin', icon: <AdminPanelIcon />, path: '/admin' },
  { text: 'Gerenciar Usuários', icon: <GroupIcon />, path: '/user-management' }
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1a237e',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Centro Médico Revoada
        </Typography>
        {user && (
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.7 }}>
            {user.name} - {user.role}
          </Typography>
        )}
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(255,255,255,0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.12)'
                }
              },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.04)'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        <ListItemButton
          key="Sair"
          onClick={() => {
            logout();
            navigate('/login');
          }}
          sx={{ mt: 2, color: 'white' }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar; 