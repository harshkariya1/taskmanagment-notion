import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Layout';

const buttonClasses = 'bg-zinc-200 text-zinc-800 py-1 px-3 rounded';
const inputClasses = 'border border-zinc-300 rounded py-1 px-3';
const cardClasses = 'bg-white p-3 rounded shadow';

const TaskCard = ({ title, count, children }) => {
  return (
    <div className={cardClasses}>
      <h3 className="text-sm font-semibold">{title} ({count})</h3>
      {children}
    </div>
  );
};

const TaskItem = ({ icon, title, description, assignee, status_name, date }) => {
  return (
    <div className="bg-zinc-100 p-2 rounded">
      <div>{icon}</div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs">Description: {description}</p>
        <p className="text-xs">Assignee: {assignee}</p>
        <p className="text-xs">Status: {status_name}</p>
        <p className="text-xs">Due Date: {new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const Priority = () => {
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/bypriority');
        const data = response.data;
        const taskGroups = data.reduce((acc, task) => {
          const { priority } = task;
          if (!acc[priority]) {
            acc[priority] = [];
          }
          acc[priority].push(task);
          return acc;
        }, {});

        const formattedTasks = Object.entries(taskGroups).map(([priority, tasks]) => ({
          priority,
          tasks
        }));

        setTasksData(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Layout>
    <div className="bg-white p-6">
      <p className="mb-4 text-zinc-600">All the product team's tasks here!</p>
      <div className="d-flex justify-content-between align-items-center mb-4">

      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {tasksData.map((column, index) => (
          <div key={index} className="col">
            <TaskCard title={column.priority} count={column.tasks.length}>
              {column.tasks.map(task => (
                <TaskItem
                  key={task.task_id}
                  icon="📋"
                  title={task.title}
                  description={task.description}
                  assignee={task.userName} // Note: `userNmae` should be corrected to `userName` if possible in the API
                  status_name={task.status}
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

export default Priority;
