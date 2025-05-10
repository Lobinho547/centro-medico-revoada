import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Usuário não encontrado</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '3rem'
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {user.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discord ID: {user.discordId}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Informações do Perfil
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Cursos e Certificações
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {user.tags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    color="primary"
                    variant="outlined"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Estatísticas
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {user.cirurgias || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cirurgias Realizadas
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {user.formularios || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Formulários Aprovados
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile; 