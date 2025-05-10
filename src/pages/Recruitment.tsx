import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, Stack } from '@mui/material';

const recruitments = [
  {
    id: 1,
    position: 'Médico Clínico Geral',
    department: 'Clínica Geral',
    status: 'Aberto',
    candidates: 5,
    requirements: ['CRM Ativo', 'Experiência mínima de 2 anos', 'Disponibilidade para plantões']
  },
  {
    id: 2,
    position: 'Enfermeiro',
    department: 'Enfermaria',
    status: 'Em análise',
    candidates: 8,
    requirements: ['COREN Ativo', 'Experiência em UTI', 'Pós-graduação em Enfermagem']
  },
  {
    id: 3,
    position: 'Fisioterapeuta',
    department: 'Fisioterapia',
    status: 'Fechado',
    candidates: 3,
    requirements: ['CREFITO Ativo', 'Experiência em Reabilitação', 'Especialização em Fisioterapia Respiratória']
  },
  {
    id: 4,
    position: 'Psicólogo',
    department: 'Psicologia',
    status: 'Aberto',
    candidates: 6,
    requirements: ['CRP Ativo', 'Experiência em Saúde Mental', 'Formação em Psicologia Clínica']
  }
];

const Recruitment: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Recrutamentos
      </Typography>
      <Grid container spacing={3}>
        {recruitments.map((recruitment) => (
          <Box key={recruitment.id} sx={{ width: { xs: '100%', md: '50%', lg: '33.33%' }, p: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {recruitment.position}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Departamento: {recruitment.department}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    label={recruitment.status}
                    color={
                      recruitment.status === 'Aberto'
                        ? 'success'
                        : recruitment.status === 'Em análise'
                        ? 'warning'
                        : 'error'
                    }
                  />
                  <Chip label={`${recruitment.candidates} candidatos`} />
                </Stack>
                <Typography variant="subtitle2" gutterBottom>
                  Requisitos:
                </Typography>
                <Stack direction="column" spacing={1}>
                  {recruitment.requirements.map((req, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      • {req}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Recruitment; 