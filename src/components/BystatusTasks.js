import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';

import 'bootstrap/dist/css/bootstrap.css';

const buttonClasses = "btn btn-outline-secondary m-1";
const cardClasses = "card mb-4";
const textClasses = "card-title h5";
const iconClasses = "me-2";

const TaskCard = ({ title, count, children }) => {
    return (
        <div className={cardClasses}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className={textClasses}>{title}</h2>
                <div className={iconClasses}>
                    <span className="badge bg-primary">{count}</span>
                    <button className="btn btn-primary ms-2">+</button>
                </div>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

const TaskItem = ({ icon, title, assignee, priority, date }) => {
    return (
        <div className="d-flex align-items-center mb-2">
            <span className={iconClasses}>{icon}</span>
            <div className="flex-grow-1">
                <div>{title}</div>
                <div>{assignee}</div>
                <div >{priority}</div>
                <div>{date}</div>
            </div>
        </div>
    );
};

const BystatusTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasksByStatus = async (status) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tasks/status/${status}`);
                return { status, tasks: response.data }; // Include status with tasks
            } catch (error) {
                console.error(`Error fetching ${status} tasks:`, error);
                return { status, tasks: [] }; // Return empty array if error occurs
            }
        };

        const statuses = ['InProgress', 'UpComing', 'InTesting', 'Completed'];
        Promise.all(statuses.map(fetchTasksByStatus))
            .then(setTasks)
            .catch((error) => {
                console.error('Error fetching tasks:', error);
                setError('Error fetching tasks. Please try again later.');
            });
    }, []);

    if (error) {
        return <div className="bg-red-100 p-6 min-h-screen">{error}</div>;
    }

    return (
        <Layout>
        <div className="bg-zinc-100 p-6 min-h-screen">
            <p className="mb-6">All the product team's tasks here!</p>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {tasks.map((taskGroup, index) => (
                    <div key={index} className="col">
                        <TaskCard title={taskGroup.status} count={taskGroup.tasks.length}>
                            {taskGroup.tasks.map((task, taskIndex) => (
                                <TaskItem
                                key={task.task_id}
                                icon="📋"
                                title={task.title}
                                assignee={task.userNmae}
                                priority={task.priority}
                                date={task.due_date}
                            />
                            ))}
                        </TaskCard>
                    </div>
                ))}
            </div>
        </div>
        </Layout>
    );
};

export default BystatusTasks;