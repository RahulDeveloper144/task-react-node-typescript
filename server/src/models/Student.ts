// server/src/models/Student.ts
import mongoose, { Document } from 'mongoose';

export interface IStudent extends Document {
  emailHash: string;
  passwordHash: string;
  data: string; // backend-encrypted (which itself is front-encrypted)
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new mongoose.Schema<IStudent>({
  emailHash: { type: String, required: true, index: true, unique: true },
  passwordHash: { type: String, required: true },
  data: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IStudent>('Student', StudentSchema);
