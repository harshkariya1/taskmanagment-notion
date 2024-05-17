import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const TasksComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const clearToken = () => {
        // Clear the token from local storage or wherever it's stored
        localStorage.removeItem('accessToken'); // Assuming token is stored in local storage
    };

    // Fetch tasks based on the search term
    const fetchSearchResults = async (term) => {
        if (term.length > 2) {
            try {
                const response = await fetch(`http://localhost:5000/api/tasks/search?query=${encodeURIComponent(term)}`);
                const data = await response.json();
                if (response.ok) {
                    setSearchResults(data);
                    setShowResults(true);
                } else {
                    throw new Error(data.error || 'Failed to fetch');
                }
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            }
        } else {
            setShowResults(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchSearchResults(searchTerm);
        }, 300); // Adding debounce to reduce the number of API calls

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const handleSearch = () => {
        fetchSearchResults(searchTerm);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/Alltask">
                    <img src="./logo.png" alt="Tasks Icon" width="30" height="30" className="me-2" />
                    Tasks
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)}>
                                <Dropdown.Toggle className="nav-link dropdown-toggle" id="dropdown-basic">
                                    Chnage View
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/BystatusTasks">By Status</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/Alltask">All Tasks</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/Priority">By Priority</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/filterbyduedate">By Due Dates</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/tasksbyassignee">By Assignee</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                    <div className="input-group mr-2 " style={{ width: '300px',margin: '2px' }}>
                        <input className="form-control " type="search" placeholder="Search Tasks" aria-label="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <div className="input-group-append">
                            <Button variant="outline-primary" onClick={handleSearch}>Search</Button>
                        </div>
                    </div>
                    {showResults && (
                        <div className="search-results-overlay">
                            <div className="search-results-dropdown">
                                {searchResults.length > 0 ? searchResults.map(result => (
                                    <div key={result.task_id} className="search-result-item">
                                        <div><strong>Title:</strong> {result.title}</div>
                                        <div><strong>Description:</strong> {result.description}</div>
                                        <div><strong>Due Date:</strong> {result.due_date}</div>
                                        <div><strong>Execution Date:</strong> {result.execution_date}</div>
                                        <div><strong>Status:</strong> {result.status}</div>
                                        <div><strong>Priority:</strong> {result.priority}</div>
                                        <div><strong>Assignee Name:</strong> {result.assignee_name}</div>
                                        <div><strong>Assigned By:</strong> {result.assigned_by_name}</div>
                                    </div>
                                )) : <div className="search-result-item">No results found</div>}
                            </div>
                        </div>
                    )}
                    <div className="navbar-nav ml-auto">
                        <Button variant="outline-primary" className="mx-2 p-2" onClick={() => navigate("/addtask")}>Add Task</Button>
                        <Button variant="outline-primary" className="mx-2 p-2" onClick={() => navigate("/edittask")}>Edit Task</Button>
                        <Button variant="outline-primary" className="mx-2 p-2" onClick={() => navigate("/profile")}>Profile</Button>
                        <Button variant="outline-primary" className="mx-2 p-2" onClick={() => {
                            clearToken();
                            navigate("/login");
                        }}>Logout</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TasksComponent;
