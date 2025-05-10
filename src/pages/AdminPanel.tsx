import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Alert,
  Grid,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface RolePermissions {
  role: string;
  canCreateSurgery: boolean;
  canEditSurgery: boolean;
  canDeleteSurgery: boolean;
}

// Dados simulados de desempenho dos médicos com datas
const performanceData = {
  cirurgias: [
    { name: 'Dr. João Silva', cirurgias: 15, sucesso: 95, data: '2024-03-20' },
    { name: 'Dra. Maria Santos', cirurgias: 12, sucesso: 92, data: '2024-03-20' },
    { name: 'Dr. Pedro Oliveira', cirurgias: 8, sucesso: 88, data: '2024-03-19' },
    { name: 'Dra. Ana Costa', cirurgias: 10, sucesso: 90, data: '2024-03-19' },
    { name: 'Dr. Carlos Souza', cirurgias: 6, sucesso: 85, data: '2024-03-18' }
  ],
  formularios: [
    { name: 'Dr. João Silva', aprovados: 45, total: 50, data: '2024-03-20' },
    { name: 'Dra. Maria Santos', aprovados: 38, total: 42, data: '2024-03-20' },
    { name: 'Dr. Pedro Oliveira', aprovados: 30, total: 35, data: '2024-03-19' },
    { name: 'Dra. Ana Costa', aprovados: 42, total: 45, data: '2024-03-19' },
    { name: 'Dr. Carlos Souza', aprovados: 25, total: 30, data: '2024-03-18' }
  ],
  cursos: [
    { name: 'Dr. João Silva', aplicados: 8, participantes: 120, data: '2024-03-20' },
    { name: 'Dra. Maria Santos', aplicados: 6, participantes: 90, data: '2024-03-20' },
    { name: 'Dr. Pedro Oliveira', aplicados: 4, participantes: 60, data: '2024-03-19' },
    { name: 'Dra. Ana Costa', aplicados: 5, participantes: 75, data: '2024-03-19' },
    { name: 'Dr. Carlos Souza', aplicados: 3, participantes: 45, data: '2024-03-18' }
  ]
};

// Dados simulados de cirurgias detalhadas
const cirurgiasDetalhadas = [
  {
    id: 1,
    paciente: "Maria Oliveira",
    medico: "Dr. João Silva",
    tipo: "Cirurgia Cardíaca",
    data: "2024-03-20",
    status: "Concluída",
    duracao: "3h 45min"
  },
  {
    id: 2,
    paciente: "José Santos",
    medico: "Dra. Maria Santos",
    tipo: "Cirurgia Ortopédica",
    data: "2024-03-20",
    status: "Concluída",
    duracao: "2h 30min"
  },
  {
    id: 3,
    paciente: "Ana Costa",
    medico: "Dr. Pedro Oliveira",
    tipo: "Cirurgia Geral",
    data: "2024-03-19",
    status: "Concluída",
    duracao: "1h 45min"
  },
  {
    id: 4,

    paciente: "Carlos Souza",
    medico: "Dra. Ana Costa",
    tipo: "Cirurgia Neurológica",
    data: "2024-03-19",
    status: "Concluída",
    duracao: "4h 15min"
  },
  {
    id: 5,
    paciente: "Roberto Lima",
    medico: "Dr. Carlos Souza",
    tipo: "Cirurgia Vascular",
    data: "2024-03-18",
    status: "Concluída",
    duracao: "2h 50min"
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminPanel: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [periodoFiltro, setPeriodoFiltro] = useState('hoje');
  const [permissions, setPermissions] = useState<RolePermissions[]>([
    {
      role: 'Diretor Geral',
      canCreateSurgery: true,
      canEditSurgery: true,
      canDeleteSurgery: true
    },
    {
      role: 'Diretor Adjunto',
      canCreateSurgery: true,
      canEditSurgery: true,
      canDeleteSurgery: true
    },
    {
      role: 'Supervisor',
      canCreateSurgery: true,
      canEditSurgery: true,
      canDeleteSurgery: false
    },
    {
      role: 'Coordenador',
      canCreateSurgery: true,
      canEditSurgery: true,
      canDeleteSurgery: false
    },
    {
      role: 'Médico Chefe',
      canCreateSurgery: true,
      canEditSurgery: true,
      canDeleteSurgery: false
    },
    {
      role: 'Médico Especialista',
      canCreateSurgery: true,
      canEditSurgery: true,
      canDeleteSurgery: false
    },
    {
      role: 'Médico Residente',
      canCreateSurgery: true,
      canEditSurgery: false,
      canDeleteSurgery: false
    },
    {
      role: 'Paramedico',
      canCreateSurgery: false,
      canEditSurgery: false,
      canDeleteSurgery: false
    },
    {
      role: 'Socorrista',
      canCreateSurgery: false,
      canEditSurgery: false,
      canDeleteSurgery: false
    },
    {
      role: 'Estagiário',
      canCreateSurgery: false,
      canEditSurgery: false,
      canDeleteSurgery: false
    }
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePermissionChange = (
    role: string,
    permission: keyof Omit<RolePermissions, 'role'>,
    value: boolean
  ) => {
    setPermissions(prev =>
      prev.map(item =>
        item.role === role ? { ...item, [permission]: value } : item
      )
    );
  };

  const handlePeriodoChange = (event: SelectChangeEvent) => {
    setPeriodoFiltro(event.target.value);
  };

  const filtrarPorPeriodo = (data: string) => {
    const hoje = new Date();
    const dataItem = new Date(data);
    const diffTime = Math.abs(hoje.getTime() - dataItem.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    switch (periodoFiltro) {
      case 'hoje':
        return diffDays === 0;
      case '7dias':
        return diffDays <= 7;
      case '15dias':
        return diffDays <= 15;
      case '30dias':
        return diffDays <= 30;
      default:
        return true;
    }
  };

  const dadosFiltrados = {
    cirurgias: performanceData.cirurgias.filter(item => filtrarPorPeriodo(item.data)),
    formularios: performanceData.formularios.filter(item => filtrarPorPeriodo(item.data)),
    cursos: performanceData.cursos.filter(item => filtrarPorPeriodo(item.data))
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Painel Administrativo
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Desempenho" />
          <Tab label="Permissões" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <>
          <Box sx={{ mb: 3 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="periodo-filtro-label">Período</InputLabel>
              <Select
                labelId="periodo-filtro-label"
                id="periodo-filtro"
                value={periodoFiltro}
                label="Período"
                onChange={handlePeriodoChange}
              >
                <MenuItem value="hoje">Hoje</MenuItem>
                <MenuItem value="7dias">Últimos 7 dias</MenuItem>
                <MenuItem value="15dias">Últimos 15 dias</MenuItem>
                <MenuItem value="30dias">Últimos 30 dias</MenuItem>
                <MenuItem value="todos">Todos</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Desempenho em Cirurgias
                </Typography>
                <Box sx={{ height: 400, width: '100%' }}>
                  <ResponsiveContainer>
                    <BarChart
                      data={dadosFiltrados.cirurgias}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="cirurgias" fill="#8884d8" name="Número de Cirurgias" />
                      <Bar yAxisId="right" dataKey="sucesso" fill="#82ca9d" name="Taxa de Sucesso (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Detalhes das Cirurgias
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Paciente</TableCell>
                        <TableCell>Médico</TableCell>
                        <TableCell>Tipo de Cirurgia</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Duração</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cirurgiasDetalhadas
                        .filter(cirurgia => filtrarPorPeriodo(cirurgia.data))
                        .map((cirurgia) => (
                          <TableRow key={cirurgia.id}>
                            <TableCell>{cirurgia.id}</TableCell>
                            <TableCell>{cirurgia.paciente}</TableCell>
                            <TableCell>{cirurgia.medico}</TableCell>
                            <TableCell>{cirurgia.tipo}</TableCell>
                            <TableCell>{new Date(cirurgia.data).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  backgroundColor: cirurgia.status === 'Concluída' ? '#4caf50' : '#f44336',
                                  color: 'white',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  display: 'inline-block'
                                }}
                              >
                                {cirurgia.status}
                              </Box>
                            </TableCell>
                            <TableCell>{cirurgia.duracao}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Aprovação de Formulários
                </Typography>
                <Box sx={{ height: 400, width: '100%' }}>
                  <ResponsiveContainer>
                    <LineChart
                      data={dadosFiltrados.formularios}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="aprovados" stroke="#8884d8" name="Formulários Aprovados" />
                      <Line type="monotone" dataKey="total" stroke="#82ca9d" name="Total de Formulários" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Aplicação de Cursos
                </Typography>
                <Box sx={{ height: 400, width: '100%' }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={dadosFiltrados.cursos}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="aplicados"
                        nameKey="name"
                        label={({ name, value }) => `${name}: ${value} cursos`}
                      >
                        {dadosFiltrados.cursos.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Permissões de Cirurgias
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Defina quais cargos podem criar, editar e excluir cirurgias.
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cargo</TableCell>
                      <TableCell align="center">Criar Cirurgia</TableCell>
                      <TableCell align="center">Editar Cirurgia</TableCell>
                      <TableCell align="center">Excluir Cirurgia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permissions.map((role) => (
                      <TableRow key={role.role}>
                        <TableCell component="th" scope="row">
                          {role.role}
                        </TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={role.canCreateSurgery}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    role.role,
                                    'canCreateSurgery',
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label=""
                          />
                        </TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={role.canEditSurgery}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    role.role,
                                    'canEditSurgery',
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label=""
                          />
                        </TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={role.canDeleteSurgery}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    role.role,
                                    'canDeleteSurgery',
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label=""
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Alert severity="warning">
        As alterações nas permissões serão aplicadas imediatamente. Certifique-se de que as permissões estão corretas antes de salvar.
      </Alert>
    </Box>
  );
};

export default AdminPanel; 