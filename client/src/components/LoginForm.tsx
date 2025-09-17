// client/src/components/LoginForm.tsx
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { sha256, frontendEncrypt } from '../utils/crypto';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email required'),
  password: yup.string().min(6, 'Min 6 chars').required('Password required'),
}).required();

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const [msg, setMsg] = useState<string>('');

  async function onRegister(data: FormValues) {
    try {
      const emailHash = sha256(data.email.trim().toLowerCase());
      const passwordHash = sha256(data.password);
      const payload = {
        fullName: '',
        email: data.email,
        phone: '',
        dob: '',
        gender: '',
        address: '',
        course: '',
        password: data.password,
      };
      const encrypted = frontendEncrypt(payload);
      await axios.post(`${API}/register`, { emailHash, passwordHash, encrypted });
      setMsg('✅ Registered successfully');
      reset();
    } catch (err: any) {
      setMsg('❌ ' + (err?.response?.data?.message || 'Registration failed'));
    }
  }

  async function onLogin(data: FormValues) {
    try {
      const emailHash = sha256(data.email.trim().toLowerCase());
      const passwordHash = sha256(data.password);
      const res = await axios.post(`${API}/login`, { emailHash, passwordHash });
      if (res.data?.ok) {
        setMsg('✅ Login successful');
      } else {
        setMsg('❌ Invalid credentials');
      }
      reset();
    } catch (err: any) {
      setMsg('❌ ' + (err?.response?.data?.message || 'Login failed'));
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Authentication</h3>
      <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
        <div>
          <input
            {...register('email')}
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register('password')}
            placeholder="Password"
            type="password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleSubmit(onRegister)}
            disabled={isSubmitting}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Quick Register
          </button>
        </div>
      </form>

      {msg && (
        <div className={`mt-3 text-sm font-medium ${msg.includes('❌') ? 'text-red-500' : 'text-green-600'}`}>
          {msg}
        </div>
      )}
    </div>
  );
}
