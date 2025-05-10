import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Link,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../contexts/AuthContext';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '@mui/material/styles';

// SVG do Discord
const DiscordSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249a18.524 18.524 0 00-5.487 0 12.51 12.51 0 00-.617-1.25.07.07 0 00-.073-.035A19.736 19.736 0 003.677 4.369a.064.064 0 00-.03.027C.533 9.09-.32 13.579.099 18.021a.08.08 0 00.031.056c2.052 1.507 4.042 2.422 5.992 3.029a.077.077 0 00.084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.104c-.652-.247-1.27-.549-1.872-.892a.077.077 0 01-.008-.127c.126-.094.252-.192.372-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.062 0a.073.073 0 01.078.009c.12.099.246.197.372.291a.077.077 0 01-.006.127 12.298 12.298 0 01-1.873.892.076.076 0 00-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028c1.961-.607 3.95-1.522 6.002-3.029a.077.077 0 00.031-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 00-.03-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419z"
      fill="#fff"
    />
  </svg>
);

// Dados fictícios para o gráfico de cirurgias
const cirurgiasData = [
  { mes: 'Jan', total: 12 },
  { mes: 'Fev', total: 18 },
  { mes: 'Mar', total: 15 },
  { mes: 'Abr', total: 20 },
  { mes: 'Mai', total: 17 },
];

const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(formData.email, formData.password)) {
      navigate('/');
    } else {
      alert('Email ou senha inválidos!');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `
          linear-gradient(135deg, #1976d2cc 0%, #0d47a1cc 100%),
          url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat
        `,
        position: 'relative',
      }}
    >
      {/* Bonequinho/ícone no topo */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <MedicalServicesIcon sx={{ fontSize: 60, color: '#fff' }} />
      </Box>
      {/* Formulário de login */}
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, minWidth: 340, maxWidth: 400, width: '100%', mb: 2 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Entrar no Centro Médico Revoada
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Box sx={{ textAlign: 'center', mb: 1 }}>
            <Button
              variant="text"
              onClick={() => navigate('/register')}
              sx={{ textTransform: 'none' }}
            >
              Não tem conta? Registrar
            </Button>
          </Box>
        </Box>
        {/* Gráfico pequeno de cirurgias */}
        <Box sx={{ mt: 3, mb: 1 }}>
          <Typography variant="subtitle2" align="center" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
            Cirurgias realizadas pelo Centro Médico Revoada (últimos meses)
          </Typography>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={cirurgiasData} barCategoryGap={20}>
              <XAxis dataKey="mes" stroke={theme.palette.text.primary} tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip cursor={{ fill: theme.palette.action.hover }} contentStyle={{ background: theme.palette.background.paper, borderRadius: 8, color: theme.palette.text.primary }} />
              <Bar dataKey="total" fill="#00e676" radius={[8, 8, 0, 0]} barSize={28} >
                {/* Mostrar valores nas barras */}
                {cirurgiasData.map((entry, index) => (
                  <text
                    key={index}
                    x={index * 80 + 40}
                    y={90 - entry.total * 2.5 - 10}
                    fill={theme.palette.text.primary}
                    fontSize={12}
                    fontWeight={600}
                    textAnchor="middle"
                  >
                    {entry.total}
                  </text>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
      {/* Informações e redes sociais no rodapé */}
      <Box sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
        <Paper elevation={0} sx={{ p: 2, background: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)', borderRadius: 2, mb: 2 }}>
          <Typography variant="body2" align="center" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'} fontWeight={500}>
            Quer fazer parte do Centro Médico Revoada?<br />
            Entre em nosso <b>Discord</b> ou vá até o hospital e procure um dos nossos recrutadores.
          </Typography>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Link href="https://www.instagram.com/revoadarj_brasil/" target="_blank" rel="noopener" underline="none">
            <Button startIcon={<InstagramIcon />} variant="contained" color="secondary" sx={{ fontWeight: 600, color: '#fff', boxShadow: 2 }}>
              Instagram
            </Button>
          </Link>
          <Link href="https://discord.gg/cAJB456rPc" target="_blank" rel="noopener" underline="none">
            <Button startIcon={<DiscordSVG />} variant="contained" color="primary" sx={{ fontWeight: 600, color: '#fff', boxShadow: 2, background: '#5865F2' }}>
              Discord
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login; 