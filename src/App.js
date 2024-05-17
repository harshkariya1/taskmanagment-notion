import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from './context/UserContext';
import Profile from './components/Profile';
import BystatusTasks from './components/BystatusTasks';
import Priority from './components/TasksByPriority';
import Alltask from './components/Alltask';
import FilterByDueDate from './components/FilterByDueDate';
import AddTask from './components/AddTask';
import Tasks from './components/TasksByAssignee';
import TasksComponent from './components/TasksComponent';
import EditTaskForm from './components/EditTaskForm';
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';

function App() {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if user is authenticated

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          {isAuthenticated ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/BystatusTasks" element={<BystatusTasks />} />
              <Route path="/Priority" element={<Priority />} />
              <Route path="/Alltask" element={<Alltask />} />
              <Route path="/addtask" element={<AddTask />} />
              <Route path="/filterbyduedate" element={<FilterByDueDate />} />
              <Route path="/tasksbyassignee" element={<Tasks />} />
              <Route path="/header" element={<TasksComponent />} />
              <Route path="/edittask" element={<EditTaskForm />} />
            </>
          ) : (
            // Redirect to login if not authenticated
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
