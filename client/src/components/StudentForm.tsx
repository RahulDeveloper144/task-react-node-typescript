// // client/src/components/StudentForm.tsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { frontendEncrypt, sha256 } from '../utils/crypto';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// type StudentPayload = {
//   fullName: string;
//   email: string;
//   phone?: string;
//   dob?: string;
//   gender?: string;
//   address?: string;
//   course?: string;
//   password: string;
// };

// const schema: yup.ObjectSchema<StudentPayload> = yup.object({
//   fullName: yup.string().required('Full name required'),
//   email: yup.string().email('Invalid email').required('Email required'),
//   phone: yup.string().optional(),
//   dob: yup.string().optional(),
//   gender: yup.string().optional(),
//   address: yup.string().optional(),
//   course: yup.string().optional(),
//   password: yup.string().min(6, 'Min 6 chars').required('Password required'),
// }) as yup.ObjectSchema<StudentPayload>;

// export default function StudentForm({
//   initial,
//   id,
//   onSaved,
//   isEditingMode,
//   onCancel,
// }: {
//   initial?: Partial<StudentPayload>;
//   id?: string;
//   onSaved?: () => void;
//   isEditingMode?: boolean;
//   onCancel?: () => void;
// }) {
//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<StudentPayload>({
//     resolver: yupResolver(schema),
//     defaultValues: initial as any,
//   });
//   const [msg, setMsg] = useState('');

//   useEffect(() => {
//     if (initial) reset(initial as any);
//   }, [initial, reset]);

//   const submit = async (data: StudentPayload) => {
//     try {
//       const emailHash = sha256(data.email.trim().toLowerCase());
//       const passwordHash = sha256(data.password);
//       const encrypted = frontendEncrypt(data);
//       if (id && isEditingMode) {
//         await axios.put(`${API}/student/${id}`, { encrypted, passwordHash });
//         setMsg('Updated');
//       } else {
//         await axios.post(`${API}/register`, { emailHash, passwordHash, encrypted });
//         setMsg('Saved');
//       }
//       onSaved?.();
//       reset();
//     } catch (err: any) {
//       setMsg(err?.response?.data?.message || 'Error saving');
//     }
//   };

//   return (
//     <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6, marginBottom: 12, maxWidth: 640 }}>
//       <h3>{isEditingMode ? 'Edit Student' : 'New Student'}</h3>
//       <form onSubmit={handleSubmit(submit)}>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
//           <input {...register('fullName')} placeholder="Full name" />
//           <input {...register('email')} placeholder="Email" />
//           <input {...register('phone')} placeholder="Phone" />
//           <input {...register('dob')} placeholder="Date of birth (YYYY-MM-DD)" />
//           <input {...register('gender')} placeholder="Gender" />
//           <input {...register('course')} placeholder="Course enrolled" />
//           <input {...register('address')} placeholder="Address" style={{ gridColumn: '1 / -1' }} />
//           <input {...register('password')} placeholder="Password" type="password" />
//         </div>

//         <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
//           <button type="submit" disabled={isSubmitting}>{isEditingMode ? 'Update' : 'Save'}</button>
//           {isEditingMode && <button type="button" onClick={() => onCancel?.()}>Cancel</button>}
//         </div>
//       </form>
//       <div style={{ marginTop: 8, color: msg.startsWith('Error') ? 'red' : 'green' }}>{msg}</div>
//       <div style={{ color: 'red', fontSize: 12 }}>
//         {Object.values(errors).map((e) => e?.message).filter(Boolean).join(' • ')}
//       </div>
//     </div>
//   );
// }


// client/src/components/StudentForm.tsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { frontendEncrypt, sha256 } from '../utils/crypto';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// type StudentPayload = {
//   fullName: string;
//   email: string;
//   phone?: string;
//   dob?: string;
//   gender?: string;
//   address?: string;
//   course?: string;
//   password: string;
// };

// const schema: yup.ObjectSchema<StudentPayload> = yup.object({
//   fullName: yup.string().required('Full name required'),
//   email: yup.string().email('Invalid email').required('Email required'),
//   phone: yup.string().optional(),
//   dob: yup.string().optional(),
//   gender: yup.string().optional(),
//   address: yup.string().optional(),
//   course: yup.string().optional(),
//   password: yup.string().min(6, 'Min 6 chars').required('Password required'),
// }) as yup.ObjectSchema<StudentPayload>;

// export default function StudentForm({
//   initial,
//   id,
//   onSaved,
//   isEditingMode,
//   onCancel,
// }: {
//   initial?: Partial<StudentPayload>;
//   id?: string;
//   onSaved?: () => void;
//   isEditingMode?: boolean;
//   onCancel?: () => void;
// }) {
//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<StudentPayload>({
//     resolver: yupResolver(schema),
//     defaultValues: initial as any,
//   });
//   const [msg, setMsg] = useState('');

//   useEffect(() => {
//     if (initial) reset(initial as any);
//   }, [initial, reset]);

//   const submit = async (data: StudentPayload) => {
//     try {
//       const emailHash = sha256(data.email.trim().toLowerCase());
//       const passwordHash = sha256(data.password);
//       const encrypted = frontendEncrypt(data);
//       if (id && isEditingMode) {
//         await axios.put(`${API}/student/${id}`, { encrypted, passwordHash });
//         setMsg('Updated successfully ✅');
//       } else {
//         await axios.post(`${API}/register`, { emailHash, passwordHash, encrypted });
//         setMsg('Saved successfully ✅');
//       }
//       onSaved?.();
//       reset();
//     } catch (err: any) {
//       setMsg(err?.response?.data?.message || 'Error saving ❌');
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg mb-6 max-w-2xl mx-auto">
//       <h3 className="text-xl font-bold mb-4 text-gray-800">{isEditingMode ? 'Edit Student' : 'Register New Student'}</h3>

//       <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           {...register('fullName')}
//           placeholder="Full name"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           {...register('email')}
//           placeholder="Email"
//           type="email"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           {...register('phone')}
//           placeholder="Phone"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           {...register('dob')}
//           placeholder="Date of birth"
//           type="date"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <select
//           {...register('gender')}
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//         <input
//           {...register('course')}
//           placeholder="Course enrolled"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           {...register('address')}
//           placeholder="Address"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition md:col-span-2"
//         />
//         <input
//           {...register('password')}
//           placeholder="Password"
//           type="password"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />

//         <div className="md:col-span-2 flex gap-3 mt-2">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition flex-1"
//           >
//             {isEditingMode ? 'Update' : 'Save'}
//           </button>
//           {isEditingMode && (
//             <button
//               type="button"
//               onClick={() => onCancel?.()}
//               className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition flex-1"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {msg && (
//         <div className={`mt-3 text-sm font-medium ${msg.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
//           {msg}
//         </div>
//       )}

//       {Object.values(errors).length > 0 && (
//         <div className="mt-2 text-red-500 text-sm">
//           {Object.values(errors).map((e) => e?.message).filter(Boolean).join(' • ')}
//         </div>
//       )}
//     </div>
//   );
// }



// client/src/components/StudentForm.tsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { frontendEncrypt, sha256 } from '../utils/crypto';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// type StudentPayload = {
//   fullName: string;
//   email: string;
//   phone?: string;
//   dob?: string;
//   gender?: string;
//   address?: string;
//   course?: string;
//   password: string;
// };

// const schema: yup.ObjectSchema<StudentPayload> = yup.object({
//   fullName: yup.string().required('Full name required'),
//   email: yup.string().email('Invalid email').required('Email required'),
//   phone: yup.string().optional(),
//   dob: yup.string().optional(),
//   gender: yup.string().optional(),
//   address: yup.string().optional(),
//   course: yup.string().optional(),
//   password: yup.string().min(6, 'Min 6 chars').required('Password required'),
// }) as yup.ObjectSchema<StudentPayload>;

// export default function StudentForm({
//   initial,
//   id,
//   onSaved,
//   isEditingMode,
//   onCancel,
// }: {
//   initial?: Partial<StudentPayload>;
//   id?: string;
//   onSaved?: () => void;
//   isEditingMode?: boolean;
//   onCancel?: () => void;
// }) {
//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<StudentPayload>({
//     resolver: yupResolver(schema),
//     defaultValues: initial as any,
//   });
//   const [msg, setMsg] = useState('');

//   useEffect(() => {
//     if (initial) reset(initial as any);
//   }, [initial, reset]);

//   const submit = async (data: StudentPayload) => {
//     try {
//       const emailHash = sha256(data.email.trim().toLowerCase());
//       const passwordHash = sha256(data.password);
//       const encrypted = frontendEncrypt(data);
//       if (id && isEditingMode) {
//         await axios.put(`${API}/student/${id}`, { encrypted, passwordHash });
//         setMsg('Updated successfully ✅');
//       } else {
//         await axios.post(`${API}/register`, { emailHash, passwordHash, encrypted });
//         setMsg('Saved successfully ✅');
//       }
//       onSaved?.();
//       reset();
//     } catch (err: any) {
//       setMsg(err?.response?.data?.message || 'Error saving ❌');
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg mb-6 max-w-2xl mx-auto">
//       <h3 className="text-xl font-bold mb-4 text-gray-800">{isEditingMode ? 'Edit Student' : 'Register New Student'}</h3>

//       <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           {...register('fullName')}
//           placeholder="Full name"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           {...register('email')}
//           placeholder="Email"
//           type="email"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           {...register('phone')}
//           placeholder="Phone"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           {...register('dob')}
//           placeholder="Date of birth"
//           type="date"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <select
//           {...register('gender')}
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//         <input
//           {...register('course')}
//           placeholder="Course enrolled"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           {...register('address')}
//           placeholder="Address"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition md:col-span-2"
//         />
//         <input
//           {...register('password')}
//           placeholder="Password"
//           type="password"
//           className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />

//         <div className="md:col-span-2 flex gap-3 mt-2">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition flex-1"
//           >
//             {isEditingMode ? 'Update' : 'Save'}
//           </button>
//           {isEditingMode && (
//             <button
//               type="button"
//               onClick={() => onCancel?.()}
//               className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition flex-1"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {msg && (
//         <div className={`mt-3 text-sm font-medium ${msg.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
//           {msg}
//         </div>
//       )}

//       {Object.values(errors).length > 0 && (
//         <div className="mt-2 text-red-500 text-sm">
//           {Object.values(errors).map((e) => e?.message).filter(Boolean).join(' • ')}
//         </div>
//       )}
//     </div>
//   );
// }



// client/src/components/StudentForm.tsx
// import { useState } from 'react';

// type PlainStudent = {
//   fullName: string;
//   email: string;
//   phone?: string;
//   dob?: string;
//   gender?: string;
//   address?: string;
//   course?: string;
//   password?: string;
// };

// type Props = {
//   initial?: PlainStudent;
//   id?: string;
//   isEditingMode?: boolean;
//   onSaved: () => void;
//   onCancel?: () => void;
// };

// export default function StudentForm({ initial, isEditingMode, onSaved, onCancel }: Props) {
//   const [formData, setFormData] = useState<PlainStudent>({
//     fullName: initial?.fullName || '',
//     email: initial?.email || '',
//     phone: initial?.phone || '',
//     dob: initial?.dob || '',
//     gender: initial?.gender || '',
//     address: initial?.address || '',
//     course: initial?.course || '',
//     password: initial?.password || '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSaved();
//   };

//   return (
//     <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg mb-6">
//       <h3 className="text-xl font-bold mb-4 text-gray-800">{isEditingMode ? 'Update Student' : 'Register Student'}</h3>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           type="email"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Phone"
//           type="tel"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           placeholder="Date of Birth"
//           type="date"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//         <input
//           name="course"
//           value={formData.course}
//           onChange={handleChange}
//           placeholder="Course"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           type="password"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition md:col-span-2"
//         />
//         <div className="md:col-span-2 flex gap-3 mt-2">
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
//           >
//             {isEditingMode ? 'Update' : 'Save'}
//           </button>
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }


// // client/src/components/StudentForm.tsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { frontendEncrypt, sha256 } from '../utils/crypto';

// type PlainStudent = {
//   fullName: string;
//   email: string;
//   phone?: string;
//   dob?: string;
//   gender?: string;
//   address?: string;
//   course?: string;
//   password?: string;
// };

// type Props = {
//   initial?: PlainStudent;
//   id?: string;
//   isEditingMode?: boolean;
//   onSaved: () => void;
//   onCancel?: () => void;
// };

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function StudentForm({ initial, isEditingMode, onSaved, onCancel, id }: Props) {
//   const [formData, setFormData] = useState<PlainStudent>({
//     fullName: initial?.fullName || '',
//     email: initial?.email || '',
//     phone: initial?.phone || '',
//     dob: initial?.dob || '',
//     gender: initial?.gender || '',
//     address: initial?.address || '',
//     course: initial?.course || '',
//     password: initial?.password || '',
//   });

//   const [msg, setMsg] = useState('');
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     if (initial) setFormData(initial);
//   }, [initial]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const errs: { [key: string]: string } = {};
//     if (!formData.fullName) errs.fullName = 'Full name required';
//     if (!formData.email) errs.email = 'Email required';
//     if (!formData.password || formData.password.length < 6) errs.password = 'Password must be 6+ chars';
//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMsg('');
//     if (!validate()) return;

//     try {
//       const payload = { ...formData };
//       const encrypted = frontendEncrypt(payload);
//       const passwordHash = sha256(payload.password || '');
//       const emailHash = sha256(payload.email || '');

//       if (isEditingMode && id) {
//         // Update existing student
//         await axios.put(`${API}/student/${id}`, { encrypted, passwordHash });
//         setMsg('✅ Student updated');
//       } else {
//         // New student registration
//         await axios.post(`${API}/register`, { encrypted, emailHash, passwordHash });
//         setMsg('✅ Student registered');
//         setFormData({
//           fullName: '',
//           email: '',
//           phone: '',
//           dob: '',
//           gender: '',
//           address: '',
//           course: '',
//           password: '',
//         });
//       }
//       onSaved();
//       setErrors({});
//     } catch (err: any) {
//       setMsg('❌ ' + (err?.response?.data?.message || 'Error saving'));
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg mb-6 max-w-2xl mx-auto">
//       <h3 className="text-xl font-bold mb-4 text-gray-800">{isEditingMode ? 'Update Student' : 'Register Student'}</h3>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         {errors.fullName && <p className="text-red-500 text-sm col-span-2">{errors.fullName}</p>}

//         <input
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           type="email"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         {errors.email && <p className="text-red-500 text-sm col-span-2">{errors.email}</p>}

//         <input
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Phone"
//           type="tel"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           placeholder="Date of Birth"
//           type="date"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//         <input
//           name="course"
//           value={formData.course}
//           onChange={handleChange}
//           placeholder="Course"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         <input
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           type="password"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition"
//         />
//         {errors.password && <p className="text-red-500 text-sm col-span-2">{errors.password}</p>}

//         <input
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none transition md:col-span-2"
//         />

//         <div className="md:col-span-2 flex gap-3 mt-2">
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
//           >
//             {isEditingMode ? 'Update' : 'Save'}
//           </button>
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//       {msg && <div className={`mt-3 font-medium ${msg.includes('❌') ? 'text-red-500' : 'text-green-600'}`}>{msg}</div>}
//     </div>
//   );
// }

// ===========

// // client/src/components/StudentForm.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { frontendEncrypt, sha256 } from "../utils/crypto";

// type PlainStudent = {
//   fullName: string;
//   email: string;
//   phone?: string;
//   dob?: string;
//   gender?: string;
//   address?: string;
//   course?: string;
//   password?: string;
// };

// type Props = {
//   initial?: PlainStudent;
//   id?: string;
//   isEditingMode?: boolean;
//   onSaved: () => void;
//   onCancel?: () => void;
// };

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// export default function StudentForm({
//   initial,
//   isEditingMode,
//   onSaved,
//   onCancel,
//   id,
// }: Props) {
//   const [formData, setFormData] = useState<PlainStudent>({
//     fullName: initial?.fullName || "",
//     email: initial?.email || "",
//     phone: initial?.phone || "",
//     dob: initial?.dob || "",
//     gender: initial?.gender || "",
//     address: initial?.address || "",
//     course: initial?.course || "",
//     password: initial?.password || "",
//   });

//   const [msg, setMsg] = useState("");
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     if (initial) setFormData(initial);
//   }, [initial]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Validation function
//   const validate = () => {
//     const errs: { [key: string]: string } = {};
//     if (!formData.fullName.trim()) errs.fullName = "Full name is required";
//     if (!formData.email.trim()) errs.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       errs.email = "Invalid email format";

//     if (!isEditingMode) {
//       if (!formData.password || formData.password.length < 6) {
//         errs.password = "Password must be at least 6 characters";
//       }
//     }

//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMsg("");
//     if (!validate()) return;

//     try {
//       const payload = { ...formData };
//       const encrypted = frontendEncrypt(payload);
//       const passwordHash = sha256(payload.password || "");
//       const emailHash = sha256(payload.email || "");

//       if (isEditingMode && id) {
//         await axios.put(`${API}/student/${id}`, { encrypted, passwordHash });
//         setMsg("✅ Student updated successfully");
//       } else {
//         await axios.post(`${API}/register`, {
//           encrypted,
//           emailHash,
//           passwordHash,
//         });
//         setMsg("✅ Student registered successfully");

//         // Reset form after save
//         setFormData({
//           fullName: "",
//           email: "",
//           phone: "",
//           dob: "",
//           gender: "",
//           address: "",
//           course: "",
//           password: "",
//         });
//       }

//       setErrors({});
//       onSaved(); // only after success
//     } catch (err: any) {
//       setMsg("❌ " + (err?.response?.data?.message || "Error saving student"));
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg mb-6 max-w-2xl mx-auto">
//       <h3 className="text-xl font-bold mb-4 text-gray-800">
//         {isEditingMode ? "Update Student" : "Register Student"}
//       </h3>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         <input
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="p-3 rounded-lg border shadow-sm"
//         />
//         {errors.fullName && (
//           <p className="text-red-500 text-sm col-span-2">{errors.fullName}</p>
//         )}

//         <input
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           type="email"
//           className="p-3 rounded-lg border shadow-sm"
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm col-span-2">{errors.email}</p>
//         )}

//         <input
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Phone"
//           type="tel"
//           className="p-3 rounded-lg border shadow-sm"
//         />
//         <input
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           placeholder="Date of Birth"
//           type="date"
//           className="p-3 rounded-lg border shadow-sm"
//         />

//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           className="p-3 rounded-lg border shadow-sm"
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>

//         <input
//           name="course"
//           value={formData.course}
//           onChange={handleChange}
//           placeholder="Course"
//           className="p-3 rounded-lg border shadow-sm"
//         />

//         {!isEditingMode && (
//           <>
//             <input
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               type="password"
//               className="p-3 rounded-lg border shadow-sm"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm col-span-2">
//                 {errors.password}
//               </p>
//             )}
//           </>
//         )}

//         <input
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="p-3 rounded-lg border shadow-sm md:col-span-2"
//         />

//         <div className="md:col-span-2 flex gap-3 mt-2">
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition flex-1"
//           >
//             {isEditingMode ? "Update" : "Save"}
//           </button>
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition flex-1"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {msg && (
//         <div
//           className={`mt-3 font-medium ${
//             msg.includes("❌") ? "text-red-500" : "text-green-600"
//           }`}
//         >
//           {msg}
//         </div>
//       )}
//     </div>
//   );
// }


// client/src/components/StudentForm.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { frontendEncrypt, sha256 } from "../utils/crypto";

type PlainStudent = {
  fullName: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address?: string;
  course?: string;
  password?: string;
};

type Props = {
  initial?: PlainStudent;
  id?: string;
  isEditingMode?: boolean;
  onSaved: () => void;
  onCancel?: () => void;
};

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function StudentForm({
  initial,
  isEditingMode,
  onSaved,
  onCancel,
  id,
}: Props) {
  const [formData, setFormData] = useState<PlainStudent>({
    fullName: initial?.fullName || "",
    email: initial?.email || "",
    phone: initial?.phone || "",
    dob: initial?.dob || "",
    gender: initial?.gender || "",
    address: initial?.address || "",
    course: initial?.course || "",
    password: initial?.password || "",
  });

  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initial) setFormData(initial);
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Invalid email format";

    if (!isEditingMode) {
      if (!formData.password || formData.password.length < 6) {
        errs.password = "Password must be at least 6 characters";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (!validate()) return;

    try {
      const payload = { ...formData };
      const encrypted = frontendEncrypt(payload);
      const passwordHash = sha256(payload.password || "");
      const emailHash = sha256(payload.email || "");

      if (isEditingMode && id) {
        await axios.put(`${API}/student/${id}`, { encrypted, passwordHash });
        setMsg("✅ Student updated successfully");
      } else {
        await axios.post(`${API}/register`, {
          encrypted,
          emailHash,
          passwordHash,
        });
        setMsg("✅ Student registered successfully");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          dob: "",
          gender: "",
          address: "",
          course: "",
          password: "",
        });
      }

      setErrors({});
      onSaved();
    } catch (err: any) {
      setMsg("❌ " + (err?.response?.data?.message || "Error saving student"));
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-200 p-8 rounded-2xl shadow-xl mb-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        {isEditingMode ? "✨ Update Student" : "📝 Register Student"}
      </h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm col-span-2">{errors.fullName}</p>
        )}

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        {errors.email && (
          <p className="text-red-500 text-sm col-span-2">{errors.email}</p>
        )}

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          type="tel"
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />

        <input
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
          type="date"
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        >
          <option value="">Select Gender</option>
          <option value="male">👨 Male</option>
          <option value="female">👩 Female</option>
          <option value="other">🌈 Other</option>
        </select>

        <input
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />

        {!isEditingMode && (
          <>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm col-span-2">
                {errors.password}
              </p>
            )}
          </>
        )}

        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition md:col-span-2"
        />

        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition flex-1 font-semibold"
          >
            {isEditingMode ? "Update" : "Save"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl shadow hover:bg-gray-200 hover:scale-105 transition flex-1 font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {msg && (
        <div
          className={`mt-5 text-center font-medium ${
            msg.includes("❌") ? "text-red-500" : "text-green-600"
          }`}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
