import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Layout';

const EditTaskForm = ({ taskId }) => {
  const defaultTaskId = taskId || 1;
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignee_name: '',
    priority_name: '',
    status_name: '',
    due_date: '',
    execution_date: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/${defaultTaskId}`);
        setTask(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tasks/edit/${defaultTaskId}`, task);
      // Redirect or show success message
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-dark text-light">
              <h2>Edit Task</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={task.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" name="description" value={task.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="assignee_name" className="form-label">Assignee</label>
                  <input type="text" className="form-control" id="assignee_name" name="assignee_name" value={task.assignee_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="priority_name" className="form-label">Priority</label>
                  <select className="form-select" id="priority_name" name="priority_name" value={task.priority_name} onChange={handleChange} required>
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="status_name" className="form-label">Status</label>
                  <input type="text" className="form-control" id="status_name" name="status_name" value={task.status_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="due_date" className="form-label">Due Date</label>
                  <input type="date" className="form-control" id="due_date" name="due_date" value={task.due_date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="execution_date" className="form-label">Execution Date</label>
                  <input type="date" className="form-control" id="execution_date" name="execution_date" value={task.execution_date} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default EditTaskForm;
