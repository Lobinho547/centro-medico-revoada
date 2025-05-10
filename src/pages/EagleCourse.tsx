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
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton
} from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, PlayCircleOutline as PlayIcon } from '@mui/icons-material';

interface Course {
  id: string;
  name: string;
  description: string;
  video: string;
}

const initialCourses: Course[] = [
  {
    id: '1',
    name: 'Exemplo de Roteiro/Curso',
    description: 'Este é um exemplo de roteiro/curso. Você pode adicionar novos roteiros/cursos usando o botão acima.',
    video: 'https://www.youtube.com/watch?v=V7BALw25ZH8'
  }
];

function getYoutubeId(url: string) {
  const match = url.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/|shorts\/)?)([\w-]{11})/);
  return match ? match[1] : '';
}

const EagleCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<Omit<Course, 'id'>>({ name: '', description: '', video: '' });
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleOpenDialog = () => {
    setForm({ name: '', description: '', video: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = () => {
    if (form.name && form.description && form.video) {
      setCourses(prev => [
        ...prev,
        { ...form, id: Date.now().toString() }
      ]);
      setOpenDialog(false);
    }
  };

  const handleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Roteiros/Cursos</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          + Novo Roteiro/Curso
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {courses.map((course) => {
          const youtubeId = getYoutubeId(course.video);
          return (
            <Card key={course.id} sx={{ width: 350 }}>
              <Box sx={{ position: 'relative', background: '#000' }}>
                {youtubeId ? (
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={course.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                    <PlayIcon sx={{ fontSize: 60 }} />
                  </Box>
                )}
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom>{course.name}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleExpand(course.id)}>
                  {expanded === course.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </CardActions>
              <Collapse in={expanded === course.id} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Novo Roteiro/Curso</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome do roteiro/curso"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            label="Descrição"
            name="description"
            fullWidth
            multiline
            minRows={2}
            value={form.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Link do vídeo (YouTube)"
            name="video"
            fullWidth
            value={form.video}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddCourse} variant="contained">Adicionar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EagleCourse; 