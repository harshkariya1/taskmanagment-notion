import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Layout';

const buttonClasses = 'btn btn-primary';
const headerClasses = 'd-flex justify-content-between align-items-center mb-6';
const tableHeaderClasses = 'thead-dark';
const tableRowClasses = 'table-light';

const FilterByDueDate = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasksByDueDate();
    }, []);

    const fetchTasksByDueDate = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks/byduedates'); // Endpoint for fetching tasks by due dates
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks by due dates:', error);
        }
    };

    return (
        <Layout>
        <div className="container bg-white p-6 rounded-lg shadow mt-4">
            <header className={headerClasses}>
                <h1 className="text-3xl font-bold text-dark">Filtered Tasks by Due Date</h1>
            </header>

            <div className="table-responsive">
                <table className="table">
                    <thead className={tableHeaderClasses}>
                        <tr>
                            <th className="px-6 py-3">Due Date</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Progress</th>
                            <th className="px-6 py-3">Execution Date</th>
                            <th className="px-6 py-3">Priority</th>
                        </tr>
                    </thead>
                    <tbody className={tableRowClasses}>
                        {tasks.map(task => (
                            <tr key={task.task_id}>
                                <td className="px-6 py-4">{new Date(task.due_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{task.title}</td>
                                <td className="px-6 py-4">{task.userNmae}</td>
                                <td className="px-6 py-4">{task.description}</td>
                                <td className="px-6 py-4">{task.status}</td>
                                <td className="px-6 py-4">{task.execution_date}</td>
                                <td className="px-6 py-4">{task.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </Layout>
    );
};

export default FilterByDueDate;
