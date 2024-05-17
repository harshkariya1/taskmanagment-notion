const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const getTasksByPriority = async (req, res) => {
  try {
    const tasks = await sequelize.query(`
      SELECT 
        t.task_id,
        t.title,
        t.description,
        u.userRole AS userRole, 
        u.Name AS userName,
        p.priority_name AS priority,
        t.due_date,
        t.execution_date,
        s.status_name AS status
      FROM 
        tasks t
      JOIN 
        users u ON t.assignee_id = u.user_id
      JOIN 
        priorities p ON t.priority_id = p.priority_id
      JOIN 
        users u_assigned_by ON t.assigned_by_id = u_assigned_by.user_id
        JOIN 
    statuses s ON t.status_id = s.status_id
      ORDER BY 
        p.priority_id DESC; -- Or use DESC for descending order
    `, {
      type: QueryTypes.SELECT
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks by priority:', err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getTasksByPriority
};
