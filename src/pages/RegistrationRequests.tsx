import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';

interface RegistrationRequest {
  id: string;
  name: string;
  email: string;
  discordId: string;
  role: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const RegistrationRequests: React.FC = () => {
  const [requests, setRequests] = useState<RegistrationRequest[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      discordId: 'joao#1234',
      role: 'Médico',
      status: 'pending',
      createdAt: '2024-05-10'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      discordId: 'maria#5678',
      role: 'Enfermeira',
      status: 'pending',
      createdAt: '2024-05-11'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleViewDetails = (request: RegistrationRequest) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
  };

  const handleApprove = (id: string) => {
    setRequests(prev =>
      prev.map(request =>
        request.id === id ? { ...request, status: 'approved' } : request
      )
    );
    handleCloseDialog();
  };

  const handleReject = (id: string) => {
    setRequests(prev =>
      prev.map(request =>
        request.id === id ? { ...request, status: 'rejected' } : request
      )
    );
    handleCloseDialog();
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'pending':
        return <Chip label="Pendente" color="warning" />;
      case 'approved':
        return <Chip label="Aprovado" color="success" />;
      case 'rejected':
        return <Chip label="Rejeitado" color="error" />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Solicitações de Registro
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Discord ID</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.discordId}</TableCell>
                <TableCell>{request.role}</TableCell>
                <TableCell>{request.createdAt}</TableCell>
                <TableCell>{getStatusChip(request.status)}</TableCell>
                <TableCell align="right">
                  {request.status === 'pending' && (
                    <>
                      <Button
                        color="success"
                        startIcon={<Check />}
                        onClick={() => handleViewDetails(request)}
                        sx={{ mr: 1 }}
                      >
                        Aprovar
                      </Button>
                      <Button
                        color="error"
                        startIcon={<Close />}
                        onClick={() => handleViewDetails(request)}
                      >
                        Rejeitar
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedRequest?.status === 'pending' ? 'Confirmar Ação' : 'Detalhes da Solicitação'}
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Nome:</strong> {selectedRequest.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {selectedRequest.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Discord ID:</strong> {selectedRequest.discordId}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Cargo:</strong> {selectedRequest.role}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Data de Solicitação:</strong> {selectedRequest.createdAt}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          {selectedRequest?.status === 'pending' && (
            <>
              <Button
                color="error"
                onClick={() => handleReject(selectedRequest.id)}
              >
                Rejeitar
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={() => handleApprove(selectedRequest.id)}
              >
                Aprovar
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegistrationRequests; 