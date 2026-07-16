// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TaskList from './views/TaskList.tsx';
import TaskForm from './views/TaskForm.tsx';
import TaskDetail from './views/TaskDetail.tsx';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold">
            <span className="fs-4">⚡</span> Task Manager
          </Link>
          <span className="navbar-text d-none d-sm-inline">
            React + TypeScript + Bootstrap
          </span>
        </div>
      </nav>

      {/* Main Responsive Container */}
      <main className="container py-2">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}