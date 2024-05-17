// routes/taskRoutes.js
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { getTasksByStatus } = require('../controllers/getTasksByStatus');
const {getAllTasks} = require('../controllers/getAllTasks')
const {getTasksByDueDates} = require('../controllers/getTasksByDueDates')
const {getTasksByPriority} = require('../controllers/getTasksByPriority')
const {addTask} = require('../controllers/addTask')
const {editTask} = require('../controllers/editTask')
const authMiddleware = require('../middleware/authMiddleware');
const getTasksByAssignee = require('../controllers/getTasksByAssignee')
const {getTaskById} = require('../controllers/getTaskById')
const  searchTasks  = require('../controllers/searchTasks');
const cors = require('cors');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors({
  withcrecredentials:true
}
));
// Secure routes with the authentication middleware
router.get('/tasks/status/:status', getTasksByStatus);
router.post('/tasks/add', authMiddleware,addTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/byduedates', getTasksByDueDates);
router.get('/tasks/bypriority', getTasksByPriority);
router.get('/tasks/byassignee', getTasksByAssignee)
router.put('/tasks/edit/:task_id', authMiddleware,editTask);
router.get('/:task_id', getTaskById);
router.get('/tasks/search',  searchTasks);

module.exports = router;
