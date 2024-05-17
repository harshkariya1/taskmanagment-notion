const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const getTasksByAssignee = async (req, res) => {
  try {
    // Raw SQL query to fetch tasks grouped by assignee
    const tasksByAssignee = await sequelize.query(
      `SELECT 
         u.user_id AS assigneeId,
         u.Name AS assignedBy,
         GROUP_CONCAT(t.title) AS tasks,
         GROUP_CONCAT(t.description) AS descriptions,
         GROUP_CONCAT(p.priority_name) AS priorities,
         GROUP_CONCAT(s.status_name) AS statuses,
         GROUP_CONCAT(t.due_date) AS dueDates,
         GROUP_CONCAT(t.execution_date) AS executionDates,
         GROUP_CONCAT(uab.Name) AS assigned_to
       FROM 
         tasks t
       JOIN 
         users u ON t.assignee_id = u.user_id
       JOIN 
         users uab ON t.assigned_by_id = uab.user_id
       JOIN 
         priorities p ON t.priority_id = p.priority_id
       JOIN 
         statuses s ON t.status_id = s.status_id
       GROUP BY 
         u.user_id, u.Name`,
      { type: QueryTypes.SELECT }
    );

    res.json(tasksByAssignee);
  } catch (error) {
    console.error('Error fetching tasks by assignee:', error);
    res.status(500).json({ error: 'Failed to fetch tasks by assignee' });
  }
};

module.exports =  getTasksByAssignee ;
