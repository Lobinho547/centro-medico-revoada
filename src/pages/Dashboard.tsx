import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Box sx={{ width: { xs: '100%', md: '50%', lg: '33.33%' }, p: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Especialidades Médicas
            </Typography>
            <Typography>
              Gerencie as especialidades médicas disponíveis no centro.
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%', lg: '33.33%' }, p: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Roteiro
            </Typography>
            <Typography>
              Visualize e gerencie as rotas e pontos de parada.
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%', lg: '33.33%' }, p: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Psicotécnico
            </Typography>
            <Typography>
              Gerencie os exames psicotécnicos e seus resultados.
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%', lg: '33.33%' }, p: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Curso Águia
            </Typography>
            <Typography>
              Acompanhe o progresso dos alunos no curso Águia.
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard; 