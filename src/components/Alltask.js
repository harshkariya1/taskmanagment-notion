import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FilterByDueDate from './FilterByDueDate';
import {  useNavigate } from 'react-router-dom';
import Layout from './Layout';

const buttonClasses = 'btn btn-primary'; 
const headerClasses = 'd-flex justify-content-between align-items-center mb-6';
const tableHeaderClasses = 'thead-dark';
const tableRowClasses = 'table-light';

const Alltask = () => {
    const [tasks, setTasks] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
   
    const navigate = useNavigate();


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tasks'); // URL needs to be the endpoint where your tasks are fetched
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, []);
    const handleFilterClick = () => {
        setShowFilter(!showFilter);
        navigate('/filterbyduedate')
    };

    const updateTasks = (filteredTasks) => {
        setTasks(filteredTasks);
    };

    return (
        <Layout>
        <div className="bg-light p-8">
            <div className="container bg-white p-6 rounded-lg shadow">
                <header className={headerClasses}>
                    <div>
                        <p className="text-secondary">All the product team's tasks here!</p>
                    </div>
                    <button className="btn btn-primary">New ▼</button>
                </header>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-4">
                        <button className={buttonClasses}>All Tasks ▼</button>
                        <button className={buttonClasses}>Properties</button>
                        <button className={buttonClasses} onClick={handleFilterClick}>Filter</button>
                        <button className={buttonClasses}>Sort</button>
                        <button className={buttonClasses}>Search</button>
                    </div>
                    <div>
                        <button className={buttonClasses}>...</button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead className={tableHeaderClasses}>
                            <tr>
                                <th className="px-6 py-3">Priority</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Assign</th>
                                <th className="px-6 py-3">Due Date</th>
                            </tr>
                        </thead>
                        <tbody className={tableRowClasses}>
                            {tasks.map(task => (
                                <tr key={task.task_id}>
                                    <td className="px-6 py-4">{task.priority}🔥</td>
                                    <td className="px-6 py-4">{task.status}</td>
                                    <td className="px-6 py-4">{task.title}</td>
                                    <td className="px-6 py-4">{task.userNmae}</td>
                                    <td className="px-6 py-4">{new Date(task.due_date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showFilter && <FilterByDueDate tasks={tasks} updateTasks={updateTasks} />}
        </div>
        </Layout>
    );
};

export default Alltask;
