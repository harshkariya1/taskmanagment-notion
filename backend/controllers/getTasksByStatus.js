const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const getTasksByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const query = `
      SELECT 
        t.task_id,
        t.title, 
        t.description, 
        u.userRole AS userRole, 
        u.Name AS userNmae,
        p.priority_name AS priority, 
        t.due_date,
        t.execution_date
      FROM 
        tasks t
      JOIN 
        users u ON t.assignee_id = u.user_id
      JOIN 
        priorities p ON t.priority_id = p.priority_id
      JOIN 
        statuses s ON t.status_id = s.status_id
      WHERE 
        s.status_name = :status
    `;
    
    const tasks = await sequelize.query(query, {
      replacements: { status },
      type: QueryTypes.SELECT
    });

    console.log('Fetched tasks:', tasks); // Log the fetched tasks

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks by status:', err);
    res.status(500).send('Server error');
  }
};

const addTask = async (req, res) => {
  const { title, description, assigneeId, priorityId, dueDate, executionDate } = req.body;
  const assignedByUserId = req.user.userId; // Assuming you have user information in the request

  try {
    // Insert the task into the tasks table, including the assigned_by_id
    const result = await Task.create({
      title,
      description,
      assigneeId,
      priorityId,
      dueDate,
      executionDate,
      assigned_by_id: assignedByUserId // Populating assigned_by_id with the assigning user's ID
    });

    res.status(201).json(result);
  } catch (err) {
    console.error('Error adding new task:', err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getTasksByStatus,
  addTask
};
