import { User } from '../contexts/AuthContext';

export const users: User[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@revoada.com",
    password: "admin123",
    role: "Diretor Geral",
    discordId: "123456789",
    tags: ["Curso・Samu", "Curso・Discord", "Curso・Águia", "Curso・Painel"],
    cirurgias: 25,
    formularios: 150
  },
  {
    id: "2",
    name: "Médico",
    email: "medico@revoada.com",
    password: "medico123",
    role: "Médico Especialista",
    discordId: "987654321",
    tags: ["Curso・Samu", "Curso・Instrutor"],
    cirurgias: 15,
    formularios: 80
  },
  {
    id: "3",
    name: "Enfermeiro",
    email: "enfermeiro@revoada.com",
    password: "enfermeiro123",
    role: "Paramedico",
    discordId: "456789123",
    tags: ["Curso・Discord", "Curso・Farmácia"],
    cirurgias: 8,
    formularios: 45
  }
]; 