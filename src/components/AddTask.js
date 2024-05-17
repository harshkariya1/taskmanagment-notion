import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS before your custom CSS
import Layout from './Layout';

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "In Progress",
    priority: "High",
    assigned_to: "",
    due_date: "",
    execution_date: ""
  });
  const [error, setError] = useState("");
  const [token, setToken] = useState(""); // Initialize token state

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Perform frontend validation
    if (!formData.title || !formData.description || !formData.assigned_to || !formData.due_date || !formData.execution_date) {
      setError("All fields are required");
      return;
    }

    setError("");
    if (!token) {
      console.error('Token is undefined');
      return;
    }

    // API request to the backend
    try {
      const response = await fetch('http://localhost:5000/api/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Task added successfully:', result);
        // Further actions on success (e.g., redirect or clear form)
        toast.success('Task added successfully');
        // Redirect to all tasks page after a short delay
        setTimeout(() => {
          navigate('/alltasks');
        }, 2000);
      } else {
        throw new Error(result.message); // Throw an error to be caught by the catch block
      }
    } catch (error) {
      console.error('Error adding task:', error.message);
      // Handle errors here, such as displaying a user notification
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-bold" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
              placeholder="Enter task title"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-sm font-bold" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
              placeholder="Enter task description"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold" htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            >
              <option>In Progress</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold" htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold" htmlFor="assigned_to">Assigned To</label>
            <input
              type="text"
              id="assigned_to"
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
              placeholder="Enter assignee name"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold" htmlFor="due_date">Due Date</label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold" htmlFor="execution_date">Execution Date</label>
            <input
              type="date"
              id="execution_date"
              name="execution_date"
              value={formData.execution_date}
              onChange={handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </div>

          {error && <p className="text-red-500 col-span-2">{error}</p>}
          <button
            type="submit"
            className="col-span-2 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Task
          </button>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
    </Layout>
  );
};

export default AddTask;
