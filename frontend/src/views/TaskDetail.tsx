// frontend/src/views/TaskDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Task } from '../types.ts';
import { API_BASE_URL } from '../config.ts';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Task>(`${API_BASE_URL}/tasks/${id}`)
      .then(res => {
        setTask(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to find the requested task details.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Permanently delete this task?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      navigate('/');
    } catch {
      alert("Failed to delete task.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Retrieving details...</p>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="alert alert-danger m-4 text-center">{error || "Task not found"}</div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-7">
        {/* Back navigation option */}
        <button onClick={() => navigate('/')} className="btn btn-light border btn-sm mb-4">← Back to Overview</button>

        <div className="card shadow-sm border p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-dark text-uppercase">{task.status}</span>
            <span className="badge bg-warning text-dark">Priority: {task.priority}</span>
          </div>

          <h2 className="fw-bold mb-3">{task.title}</h2>
          
          <p className="text-secondary mb-4" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {task.description || <span className="text-muted italic">No descriptions available.</span>}
          </p>

          <hr className="my-4 text-muted" />

          {/* Timestamp logs & info grid */}
          <div className="row g-3 small text-muted mb-4">
            <div className="col-6"><strong>📅 Due Date:</strong> <br /> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</div>
            <div className="col-6"><strong>🔑 Reference ID:</strong> <br /> {task.id.slice(0, 8)}...</div>
            <div className="col-6"><strong>Created at:</strong> <br /> {new Date(task.createdAt).toLocaleString()}</div>
            <div className="col-6"><strong>Last updated:</strong> <br /> {new Date(task.updatedAt).toLocaleString()}</div>
          </div>

          <div className="d-flex gap-2">
            <Link to={`/tasks/${task.id}/edit`} className="btn btn-primary px-4">Modify Task</Link>
            <button onClick={handleDelete} className="btn btn-outline-danger px-4">Delete Task</button>
          </div>
        </div>
      </div>
    </div>
  );
}