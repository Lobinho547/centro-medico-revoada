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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Lista de tags disponíveis
const AVAILABLE_TAGS = [
  'Curso・Samu',
  'Curso・Discord',
  'Curso・Águia',
  'Curso・Moto Aérea',
  'Curso・Painel',
  'Curso・Farmácia',
  'Curso・Instrutor'
];

interface User {
  id: string;
  name: string;
  role: string;
  discordId: string;
  tags: string[];
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'João Silva',
      role: 'Médico',
      discordId: '123456789',
      tags: ['Curso・Samu', 'Curso・Instrutor']
    },
    {
      id: '2',
      name: 'Maria Santos',
      role: 'Enfermeira',
      discordId: '987654321',
      tags: ['Curso・Discord', 'Curso・Painel']
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    role: '',
    discordId: '',
    tags: []
  });

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setNewUser(user);
    } else {
      setSelectedUser(null);
      setNewUser({
        name: '',
        role: '',
        discordId: '',
        tags: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setNewUser({
      name: '',
      role: '',
      discordId: '',
      tags: []
    });
  };

  const handleTagToggle = (tag: string) => {
    setNewUser(prev => {
      const currentTags = prev.tags || [];
      const newTags = currentTags.includes(tag)
        ? currentTags.filter(t => t !== tag)
        : [...currentTags, tag];
      return { ...prev, tags: newTags };
    });
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      // Editar usuário existente
      setUsers(prev =>
        prev.map(user =>
          user.id === selectedUser.id ? { ...newUser, id: user.id } as User : user
        )
      );
    } else {
      // Adicionar novo usuário
      const newId = (users.length + 1).toString();
      setUsers(prev => [...prev, { ...newUser, id: newId } as User]);
    }
    handleCloseDialog();
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Gerenciamento de Usuários</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Usuário
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>ID Discord</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.discordId}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {user.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleOpenDialog(user)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton onClick={() => handleDeleteUser(user.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Nome"
              fullWidth
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Cargo</InputLabel>
              <Select
                value={newUser.role || ''}
                label="Cargo"
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <MenuItem value="Médico">Médico</MenuItem>
                <MenuItem value="Enfermeiro">Enfermeiro</MenuItem>
                <MenuItem value="Paramedico">Paramedico</MenuItem>
                <MenuItem value="Socorrista">Socorrista</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="ID Discord"
              fullWidth
              value={newUser.discordId}
              onChange={(e) => setNewUser({ ...newUser, discordId: e.target.value })}
            />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {AVAILABLE_TAGS.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => handleTagToggle(tag)}
                    color={newUser.tags?.includes(tag) ? 'primary' : 'default'}
                    variant={newUser.tags?.includes(tag) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveUser} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 