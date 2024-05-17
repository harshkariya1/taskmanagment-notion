import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Layout';

const TaskCard = ({ assignee }) => (
  <div className="card h-100">
    <div className="card-header">
      <h2 className="font-bold text-lg mb-1">Assigned By: {assignee.assignedBy}</h2>
      <p className="card-text">Assigned To: {assignee.assigned_to}</p>
    </div>
    <div className="card-body">
      <p className="card-text">Tasks: {assignee.tasks}</p>
      <p className="card-text">Descriptions: {assignee.descriptions}</p>
      <p className="card-text">Priorities: {assignee.priorities}</p>
      <p className="card-text">Statuses: {assignee.statuses}</p>
      <p className="card-text">Due Dates: {assignee.dueDates}</p>
      <p className="card-text">Execution Dates: {assignee.executionDates}</p>
    </div>
  </div>
);

const Tasks = () => {
  const [tasksByAssignee, setTasksByAssignee] = useState([]);

  useEffect(() => {
    const fetchTasksByAssignee = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/byassignee');
        setTasksByAssignee(response.data);
      } catch (error) {
        console.error('Error fetching tasks by assignee:', error);
      }
    };

    fetchTasksByAssignee();
  }, []);

  return (
    <Layout>
    <div className="container-fluid p-4">
      <div className="d-flex align-items-center mb-4">
      </div>
      <p className="text-muted mb-4">All the product team's tasks here!</p>
      {/* <div className="d-flex justify-content-between mb-4">
        <div className="d-flex">
          <input type="text" placeholder="Search" className="form-control me-2" />
          <button className="btn btn-primary">New</button>
        </div>
      </div> */}
      <div className="row">
        {tasksByAssignee.map(assignee => (
          <div className="col-md-4" key={assignee.assigneeId}>
            <TaskCard assignee={assignee} />
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default Tasks;