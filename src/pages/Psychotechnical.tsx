import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

interface PsychotechnicalExam {
  id: string;
  name: string;
  rg: string;
  userId: string;
  policial: boolean;
  pequenoPorte: boolean;
  grandePorte: boolean;
}

const Psychotechnical: React.FC = () => {
  const [exams, setExams] = useState<PsychotechnicalExam[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<Omit<PsychotechnicalExam, 'id'>>({
    name: '',
    rg: '',
    userId: '',
    policial: false,
    pequenoPorte: false,
    grandePorte: false
  });
  const [search, setSearch] = useState('');

  const handleOpenDialog = () => {
    setForm({ name: '', rg: '', userId: '', policial: false, pequenoPorte: false, grandePorte: false });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddExam = () => {
    setExams(prev => [
      ...prev,
      { ...form, id: Date.now().toString() }
    ]);
    setOpenDialog(false);
  };

  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(search.toLowerCase()) ||
    exam.userId.toLowerCase().includes(search.toLowerCase()) ||
    exam.rg.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Exames Psicotécnicos</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          + Novo Exame Psicotécnico
        </Button>
      </Box>
      <TextField
        placeholder="Pesquisar por nome, ID ou RG..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton disabled>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Paper sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>RG</TableCell>
                <TableCell>Policial?</TableCell>
                <TableCell>Pequeno Porte</TableCell>
                <TableCell>Grande Porte</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.name}</TableCell>
                  <TableCell>{exam.userId}</TableCell>
                  <TableCell>{exam.rg}</TableCell>
                  <TableCell>{exam.policial ? 'Sim' : 'Não'}</TableCell>
                  <TableCell>{exam.pequenoPorte ? 'Sim' : 'Não'}</TableCell>
                  <TableCell>{exam.grandePorte ? 'Sim' : 'Não'}</TableCell>
                </TableRow>
              ))}
              {filteredExams.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum exame registrado ainda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Novo Exame Psicotécnico</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            label="ID"
            name="userId"
            fullWidth
            value={form.userId}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="RG"
            name="rg"
            fullWidth
            value={form.rg}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Checkbox checked={form.policial} onChange={handleChange} name="policial" />}
            label="Policial? (Cobrar 200K, depositar 100K no painel)"
          />
          <FormControlLabel
            control={<Checkbox checked={form.pequenoPorte} onChange={handleChange} name="pequenoPorte" />}
            label="Pequeno Porte (Cobrar 400K, depositar 200K no painel)"
          />
          <FormControlLabel
            control={<Checkbox checked={form.grandePorte} onChange={handleChange} name="grandePorte" />}
            label="Grande Porte (Cobrar 500K, depositar 250K no painel)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddExam} variant="contained">Registrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Psychotechnical; 