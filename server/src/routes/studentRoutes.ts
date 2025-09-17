// server/src/routes/studentRoutes.ts
import { Router } from 'express';
import {
  registerStudent,
  login,
  getStudents,
  updateStudent,
  deleteStudent
} from '../controllers/studentController';

const router = Router();

router.post('/register', registerStudent);
router.post('/login', login);
router.get('/students', getStudents);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

export default router;
