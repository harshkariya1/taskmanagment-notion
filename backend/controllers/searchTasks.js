// controllers/taskController.js


const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');


const searchTasks = async (req, res) => {
    const { query } = req.query;
    try {
        const tasks = await sequelize.query(`
        SELECT
        t.task_id,
        t.title,
        t.description,
        t.due_date,
        t.execution_date,
        s.status_name AS status,
        p.priority_name AS priority,
        assignee.Name AS assignee_name,
        assigned_by.Name AS assigned_by_name
    FROM tasks t
    JOIN users assignee ON t.assignee_id = assignee.user_id
    JOIN users assigned_by ON t.assigned_by_id = assigned_by.user_id
    JOIN statuses s ON t.status_id = s.status_id
    JOIN priorities p ON t.priority_id = p.priority_id
    WHERE t.title LIKE :searchQuery
        OR t.description LIKE :searchQuery
        OR p.priority_name LIKE :searchQuery
        OR s.status_name LIKE :searchQuery
        OR assignee.Name LIKE :searchQuery
        OR assigned_by.Name LIKE :searchQuery
        OR CAST(t.execution_date AS CHAR) LIKE :searchQuery
        OR CAST(t.due_date AS CHAR) LIKE :searchQuery
            `,
            {
                replacements: { searchQuery: '%' + query + '%' },
                type: QueryTypes.SELECT
            }
        );
        res.json(tasks);
    } catch (error) {
        console.error('Error retrieving search results:', error);
        res.status(500).json({ error: 'Error retrieving tasks' });
    }
};

module.exports = searchTasks;
