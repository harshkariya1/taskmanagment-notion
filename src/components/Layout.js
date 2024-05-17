import React from 'react';
import TasksComponent from './TasksComponent'; // Assuming your header component is named TasksComponent

const Layout = ({ children }) => {
    return (
        <div>
            <TasksComponent />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
