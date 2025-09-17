// client/src/App.tsx
import React from 'react';
import LoginForm from './components/LoginForm';
import StudentList from './components/StudentList';

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Student Management (2-level encryption)</h1>
      <LoginForm />
      <hr style={{ margin: '16px 0' }} />
      <StudentList />
    </div>
  );
}
