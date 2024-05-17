const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const getTaskById = async (req, res) => {
  const taskId = req.params.task_id;

  try {
    const task = await sequelize.query(
      `SELECT t.task_id, t.title, t.description, u.Name as assignee_name, p.priority_name, s.status_name, t.due_date, t.execution_date
      FROM tasks t
      LEFT JOIN users u ON t.assignee_id = u.user_id
      LEFT JOIN priorities p ON t.priority_id = p.priority_id
      LEFT JOIN statuses s ON t.status_id = s.status_id
      WHERE t.task_id = :taskId`,
      { replacements: { taskId }, type: QueryTypes.SELECT }
    );

    if (!task || task.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task[0]);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTaskById
};
