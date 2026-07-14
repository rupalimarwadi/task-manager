// frontend/src/views/TaskForm.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config.ts';

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API_BASE_URL}/tasks/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setDescription(res.data.description || '');
          setStatus(res.data.status);
          setPriority(res.data.priority);
          setDueDate(res.data.dueDate ? new Date(res.data.dueDate).toISOString().split('T')[0] : '');
        })
        .catch(() => setError("Failed to fetch task information."));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title field is required.");
    if (title.length > 100) return setError("Title must be 100 characters or less.");

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    };

    try {
      if (isEdit) {
        await axios.put(`${API_BASE_URL}/tasks/${id}`, payload);
      } else {
        await axios.post('${API_BASE_URL}/tasks', payload);
      }
      setSuccess("Success! Moving back to list...");
      setTimeout(() => navigate('/'), 1200);
    } catch (err: any) {
      const serverErr = err.response?.data?.errors?.[0]?.msg || "Failed to submit form.";
      setError(serverErr);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm border p-4">
          <h3 className="fw-bold mb-4">{isEdit ? "✏️ Edit Task" : "📝 Create Task"}</h3>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}
          {success && <div className="alert alert-success py-2 small">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Task Title <span className="text-danger">*</span></label>
              <input 
                type="text" 
                className="form-control" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Enter title (max 100 characters)" 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Detailed Description</label>
              <textarea 
                className="form-control" 
                rows={4}
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Describe what needs to be done..." 
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6">
                <label className="form-label fw-semibold">Status</label>
                <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">Priority Level</label>
                <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Due Date</label>
              <input type="date" className="form-control" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary px-4">Save Changes</button>
              <button type="button" onClick={() => navigate('/')} className="btn btn-light border px-4">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}