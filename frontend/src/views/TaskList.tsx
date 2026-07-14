// frontend/src/views/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Task } from '../types.ts';
import { API_BASE_URL } from '../config.ts';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (status) q.append('status', status);
      q.append('sortBy', sortBy);
      q.append('order', order);

      const res = await axios.get<Task[]>(`${API_BASE_URL}/tasks?${q.toString()}`);
      setTasks(res.data);
      setError(null);
    } catch {
      setError("Unable to connect to the task server. Check if the backend is running on port 3000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [status, sortBy, order]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Do you want to permanently delete this task?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      alert("Failed to delete task.");
    }
  };

  // Maps status to Bootstrap color codes
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'TODO': return 'bg-danger-subtle text-danger border border-danger-subtle';
      case 'IN_PROGRESS': return 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';
      case 'DONE': return 'bg-success-subtle text-success border border-success-subtle';
      default: return 'bg-secondary-subtle text-secondary';
    }
  };

  // Maps priority to Bootstrap badge colors
  const getPriorityBadge = (prio: string) => {
    switch (prio) {
      case 'LOW': return 'bg-light text-dark border';
      case 'MEDIUM': return 'bg-primary text-white';
      case 'HIGH': return 'bg-orange text-white bg-warning';
      case 'CRITICAL': return 'bg-danger text-white';
      default: return 'bg-secondary';
    }
  };

  return (
    <div>
      {/* Header section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">My Tasks</h2>
        <Link to="/tasks/new" className="btn btn-primary shadow-sm">+ Add Task</Link>
      </div>

      {error && <div className="alert alert-danger shadow-sm mb-4">{error}</div>}

      {/* Filter and sorting controls */}
      <div className="row g-3 bg-white p-3 rounded-3 shadow-sm mb-4 border align-items-end">
        <div className="col-md-3">
          <label className="form-label text-muted small fw-semibold">Filter by Status</label>
          <select className="form-select form-select-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label text-muted small fw-semibold">Sort By</label>
          <select className="form-select form-select-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Created Date</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label text-muted small fw-semibold">Sort Order</label>
          <select className="form-select form-select-sm" value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
      </div>

      {/* Grid displays */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Retrieving tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm border">
          <p className="text-muted m-0">No tasks found matching current parameters.</p>
        </div>
      ) : (
        <div className="row g-4">
          {tasks.map((task) => (
            <div key={task.id} className="col-12 col-md-6 col-lg-4">
              <div 
                className="card h-100 shadow-sm border task-card"
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div>
                    {/* Badges row */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className={`badge rounded-pill px-3 py-2 text-uppercase ${getStatusBadge(task.status)}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                      <span className={`badge px-2.5 py-1.5 ${getPriorityBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>

                    <h5 className="card-title fw-bold text-truncate mb-2">{task.title}</h5>
                    <p className="card-text text-secondary small text-muted mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {task.description || "No description provided."}
                    </p>
                  </div>

                  <div className="border-top pt-3 d-flex justify-content-between align-items-center mt-auto">
                    <span className="small text-muted">
                      📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                    </span>
                    <div className="d-flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Link to={`/tasks/${task.id}/edit`} className="btn btn-outline-primary btn-sm px-3">Edit</Link>
                      <button onClick={(e) => handleDelete(task.id, e)} className="btn btn-outline-danger btn-sm">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}