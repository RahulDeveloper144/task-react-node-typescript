// client/src/components/StudentList.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { frontendDecrypt } from '../utils/crypto';
import StudentForm from './StudentForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type ServerStudent = {
  id: string;
  emailHash: string;
  encrypted: string;
  createdAt?: string;
};

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

export default function StudentList() {
  const [students, setStudents] = useState<
    Array<{ id: string; plain?: PlainStudent; emailHash: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<{ id: string; data?: PlainStudent } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/students`);
        if (res.data?.ok) {
          const list: ServerStudent[] = res.data.students || [];
          const mapped = list.map((s) => {
            let plainObj: PlainStudent | undefined = undefined;
            try {
              const decrypted = frontendDecrypt(s.encrypted);
              if (decrypted) plainObj = JSON.parse(decrypted);
            } catch {
              plainObj = undefined;
            }
            return { id: s.id, plain: plainObj, emailHash: s.emailHash };
          });
          setStudents(mapped);
        } else {
          setError('Failed to fetch');
        }
      } catch (err: any) {
        setError(err?.message || 'Error fetching');
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this student?')) return;
    try {
      await axios.delete(`${API}/student/${id}`);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  const startEdit = (id: string) => {
    const it = students.find((s) => s.id === id);
    if (!it || !it.plain) return alert('Cannot edit: decrypt failed or data missing');
    setEditing({ id, data: it.plain });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSaved = () => {
    setEditing(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
        🎓 Students
      </h2>

      {editing ? (
        <StudentForm
          initial={editing.data}
          id={editing.id}
          isEditingMode
          onSaved={onSaved}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <StudentForm onSaved={onSaved} />
      )}

      {loading && <div className="text-blue-500 mt-4">Loading...</div>}
      {error && <div className="text-red-500 mt-2">{error}</div>}

      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Course</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition"
              >
                <td className="px-6 py-3">{s.plain?.fullName ?? '—'}</td>
                <td className="px-6 py-3">{s.plain?.email ?? '—'}</td>
                <td className="px-6 py-3">{s.plain?.course ?? '—'}</td>
                <td className="px-6 py-3 flex items-center gap-3">
                  <button
                    onClick={() => startEdit(s.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow hover:opacity-90"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 shadow hover:opacity-90"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No students yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

