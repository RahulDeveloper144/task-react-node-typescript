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
