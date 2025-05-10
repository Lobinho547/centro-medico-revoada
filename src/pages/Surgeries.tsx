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

interface SurgeryRecord {
  id: string;
  name: string;
  userId: string;
  phone: string;
  age: string;
  reason: string;
  funcional: boolean;
  apto: boolean;
}

const Surgeries: React.FC = () => {
  const [surgeries, setSurgeries] = useState<SurgeryRecord[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<Omit<SurgeryRecord, 'id'>>({
    name: '',
    userId: '',
    phone: '',
    age: '',
    reason: '',
    funcional: false,
    apto: false
  });
  const [search, setSearch] = useState('');

  const handleOpenDialog = () => {
    setForm({ name: '', userId: '', phone: '', age: '', reason: '', funcional: false, apto: false });
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

  const handleAddSurgery = () => {
    setSurgeries(prev => [
      ...prev,
      { ...form, id: Date.now().toString() }
    ]);
    setOpenDialog(false);
  };

  const filteredSurgeries = surgeries.filter(surgery =>
    surgery.name.toLowerCase().includes(search.toLowerCase()) ||
    surgery.userId.toLowerCase().includes(search.toLowerCase()) ||
    surgery.phone.toLowerCase().includes(search.toLowerCase()) ||
    surgery.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Registro de Cirurgias</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          + Nova Cirurgia
        </Button>
      </Box>
      <TextField
        placeholder="Pesquisar por nome, ID, telefone ou motivo..."
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
                <TableCell>Telefone</TableCell>
                <TableCell>Idade</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Funcionario</TableCell>
                <TableCell>Apto para Cirurgia?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSurgeries.map((surgery) => (
                <TableRow key={surgery.id}>
                  <TableCell>{surgery.name}</TableCell>
                  <TableCell>{surgery.userId}</TableCell>
                  <TableCell>{surgery.phone}</TableCell>
                  <TableCell>{surgery.age}</TableCell>
                  <TableCell>{surgery.reason}</TableCell>
                  <TableCell>{surgery.funcional ? 'Sim' : 'Não'}</TableCell>
                  <TableCell>{surgery.apto ? 'Sim' : 'Não'}</TableCell>
                </TableRow>
              ))}
              {filteredSurgeries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Nenhuma cirurgia registrada ainda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Nova Cirurgia</DialogTitle>
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
            label="Telefone"
            name="phone"
            fullWidth
            value={form.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Idade"
            name="age"
            fullWidth
            value={form.age}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Motivo da Cirurgia"
            name="reason"
            fullWidth
            value={form.reason}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Checkbox checked={form.funcional} onChange={handleChange} name="funcional" />}
            label="Funcionario"
          />
          <FormControlLabel
            control={<Checkbox checked={form.apto} onChange={handleChange} name="apto" />}
            label="O paciente está apto para cirurgia?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddSurgery} variant="contained">Registrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Surgeries; 