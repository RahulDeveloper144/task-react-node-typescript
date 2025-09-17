// server/src/controllers/studentController.ts
import { Request, Response } from 'express';
import Student from '../models/Student';
import { backendEncrypt, backendDecrypt } from '../utils/crypto';

// POST /api/register
export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { emailHash, passwordHash, encrypted } = req.body;
    if (!emailHash || !passwordHash || !encrypted) {
      return res.status(400).json({ message: 'Missing fields (emailHash | passwordHash | encrypted)' });
    }

    const exists = await Student.findOne({ emailHash });
    if (exists) return res.status(409).json({ message: 'Student already exists' });

    // Double-encrypt: server wraps frontend-encrypted string with BACK_KEY
    const doubleEncrypted = backendEncrypt(encrypted);
    const student = await Student.create({ emailHash, passwordHash, data: doubleEncrypted });
    return res.status(201).json({ ok: true, id: student._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/login
export const login = async (req: Request, res: Response) => {
  try {
    const { emailHash, passwordHash } = req.body;
    if (!emailHash || !passwordHash) return res.status(400).json({ message: 'Missing fields' });

    const student = await Student.findOne({ emailHash });
    if (!student) return res.status(401).json({ message: 'Invalid credentials' });
    if (student.passwordHash !== passwordHash) return res.status(401).json({ message: 'Invalid credentials' });

    return res.json({ ok: true, id: student._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/students
// returns: { ok: true, students: [{ id, emailHash, encrypted, createdAt }] }
// - encrypted: decrypted with BACK_KEY once (so still encrypted by FRONT_KEY)
export const getStudents = async (req: Request, res: Response) => {
  try {
    const docs = await Student.find().select('emailHash data createdAt').sort({ createdAt: -1 });
    const students = docs.map(d => {
      const frontendEncrypted = backendDecrypt(d.data); // remove server layer
      return { id: d._id, emailHash: d.emailHash, encrypted: frontendEncrypted, createdAt: d.createdAt };
    });
    return res.json({ ok: true, students });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/student/:id
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { encrypted, passwordHash } = req.body; // encrypted is frontend-encrypted payload
    if (!encrypted) return res.status(400).json({ message: 'Missing encrypted payload' });

    const update: any = { data: backendEncrypt(encrypted) };
    if (passwordHash) update.passwordHash = passwordHash;

    const updated = await Student.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Student not found' });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/student/:id
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
};
