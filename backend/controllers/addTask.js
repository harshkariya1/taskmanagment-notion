const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const addTask = async (req, res) => {
  const user_id = req.user.user_id; // Extract the user ID from the request
console.log(user_id);
  // Extract task details from the request body
  const { title, description, status, priority, assigned_to, due_date, execution_date } = req.body;
  console.log('Request Body:', req.body);
  // if (!title || !description || !status || !priority || !assigned_to || !due_date || !execution_date ) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }
  console.log('Request Body:', req.body);

  try {
    console.log('Request received. User ID:', user_id);

    // Check if the user is an assigner (assuming assigners have a specific role in your user model)
    const user = await sequelize.query(
      'SELECT * FROM users WHERE user_id = :user_id AND userRole = "Assigner"',
      { replacements: {user_id}, type: QueryTypes.SELECT }
    );
    console.log('SQL query:', 'SELECT * FROM users WHERE user_id = :user_id AND userRole = "Assigner"');
console.log('Replacements:', [user_id]);


    // If the user is not an assigner, return unauthorized response
    if (!user.length) {
      console.log('User is not authorized to add tasks');
      return res.status(403).json({ message: 'You are not authorized to add tasks' });
    }

    // Fetch the assigned_by ID
    const assigned_by_id = user_id;
    console.log({ assigned_to });
    // Get the assignee_id, priority_id, and status_id based on provided values
    console.log(assigned_to)
    const [assignee] = await sequelize.query(
      'SELECT user_id FROM users WHERE Name = :assigned_to',
      { replacements: {  assigned_to  }, type: QueryTypes.SELECT }
    );
    
    console.log(assignee)

    console.log('rrr');
    const [priorityRow] = await sequelize.query(
      'SELECT priority_id FROM priorities WHERE priority_name = ?',
      { replacements: [priority], type: QueryTypes.SELECT }
    );
    const [statusRow] = await sequelize.query(
      'SELECT status_id FROM statuses WHERE status_name = ?',
      { replacements: [status], type: QueryTypes.SELECT }
    );

    // Extract the IDs or set them to null if not found
    const assignee_id = assignee ? assignee.user_id : null;
    const priority_id = priorityRow ? priorityRow.priority_id : null;
    const status_id = statusRow ? statusRow.status_id : null;

    console.log('Assignee ID:', assignee_id);
    console.log('Priority ID:', priority_id);
    console.log('Status ID:', status_id);
    

    // Insert the new task into the database
    const result = await sequelize.query(
      `INSERT INTO tasks (title, description, assignee_id, priority_id, status_id, due_date, execution_date, assigned_by_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      { replacements: [title, description, assignee_id, priority_id, status_id, due_date, execution_date, assigned_by_id], type: QueryTypes.INSERT }
    );

    // Get the task ID of the newly inserted task
    const taskId = result[0];

    console.log('New task added. Task ID:', taskId);

    // Return success response with the inserted task ID
    res.status(201).json({ message: 'Task added successfully', taskId });
  } catch (err) {
    console.error('Error adding new task:', err);
    res.status(500).json({ message: 'Server error', msg : err.message });
  }
};

module.exports = {
  addTask
};
