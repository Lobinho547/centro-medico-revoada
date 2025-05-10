import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

interface Specialty {
  id: string;
  name: string;
  image: string;
}

const initialSpecialties: Specialty[] = [
  {
    id: '1',
    name: 'Cardiologia',
    image: 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-cardiologia_114360-8036.jpg'
  },
  {
    id: '2',
    name: 'Ortopedia',
    image: 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-ortopedia_114360-8037.jpg'
  }
];

const MedicalSpecialties: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>(initialSpecialties);
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Specialty>>({ name: '', image: '' });

  const handleOpenDialog = () => {
    setForm({ name: '', image: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setForm({ name: '', image: '' });
  };

  const handleAddSpecialty = () => {
    if (form.name && form.image) {
      setSpecialties(prev => [
        ...prev,
        { id: Date.now().toString(), name: form.name as string, image: form.image as string }
      ]);
      handleCloseDialog();
    }
  };

  const handleEdit = (id: string) => {
    const specialty = specialties.find(s => s.id === id);
    if (specialty) {
      setEditId(id);
      setForm({ name: specialty.name, image: specialty.image });
    }
  };

  const handleSaveEdit = (id: string) => {
    setSpecialties(prev =>
      prev.map(s =>
        s.id === id ? { ...s, name: form.name || '', image: form.image || '' } : s
      )
    );
    setEditId(null);
    setForm({ name: '', image: '' });
  };

  const handleDelete = (id: string) => {
    setSpecialties(prev => prev.filter(s => s.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Especialidades Médicas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Nova Especialidade
        </Button>
      </Box>
      <Grid container spacing={3}>
        {specialties.map((specialty) => (
          <Grid item xs={12} sm={6} md={4} key={specialty.id}>
            <Card>
              {editId === specialty.id ? (
                <>
                  <CardContent>
                    <TextField
                      label="Nome"
                      fullWidth
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="URL da Imagem"
                      fullWidth
                      value={form.image}
                      onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    />
                  </CardContent>
                  <CardActions>
                    <IconButton color="primary" onClick={() => handleSaveEdit(specialty.id)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => setEditId(null)}>
                      <CancelIcon />
                    </IconButton>
                  </CardActions>
                </>
              ) : (
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    image={specialty.image}
                    alt={specialty.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{specialty.name}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton color="primary" onClick={() => handleEdit(specialty.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(specialty.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Nova Especialidade</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            label="URL da Imagem"
            fullWidth
            value={form.image}
            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddSpecialty} variant="contained">Adicionar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MedicalSpecialties; 