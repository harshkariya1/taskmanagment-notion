const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const editTask = async (req, res) => {
  const taskId = req.params.task_id; // Extract the task ID from the request parameters
  const  userRole  = req.user;
  const  userId  = req.user.user_id;
  console.log(userRole);
  console.log(userId); // Extract the user ID and role from the request (assuming you have user authentication middleware)

  try {
    // Check if the user is an Assigner
    const [user] = await sequelize.query('SELECT userRole FROM users WHERE user_id = ?', { replacements: [userId], type: QueryTypes.SELECT });
    if (!user || user.userRole !== 'Assigner') {
      return res.status(403).json({ message: 'You are not authorized to edit tasks' });
    }

    // Check if the task exists
    const [task] = await sequelize.query('SELECT * FROM tasks WHERE task_id = ?', { replacements: [taskId], type: QueryTypes.SELECT });
    if (!task || task.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Get assignee_id, priority_id, and status_id from their respective tables
    const [assignee] = await sequelize.query('SELECT user_id FROM users WHERE Name = ?', { replacements: [req.body.assignee_name], type: QueryTypes.SELECT });
    const [priority] = await sequelize.query('SELECT priority_id FROM priorities WHERE priority_name = ?', { replacements: [req.body.priority_name], type: QueryTypes.SELECT });
    const [status] = await sequelize.query('SELECT status_id FROM statuses WHERE status_name = ?', { replacements: [req.body.status_name], type: QueryTypes.SELECT });

    // Update the task details
    const updateQuery = `
      UPDATE tasks 
      SET 
        title = ?,
        description = ?,
        assignee_id = ?,
        priority_id = ?,
        status_id = ?,
        due_date = ?,
        execution_date = ?
      WHERE 
        task_id = ?
    `;
    const updateValues = [
      req.body.title,
      req.body.description,
      assignee ? assignee.user_id : null,
      priority ? priority.priority_id : null,
      status ? status.status_id : null,
      req.body.due_date,
      req.body.execution_date,
      taskId
    ];
    await sequelize.query(updateQuery, { replacements: updateValues, type: QueryTypes.UPDATE });

    // Return success response
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error('Error editing task:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  editTask
};
