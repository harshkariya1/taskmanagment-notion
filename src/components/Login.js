import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Toast } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    useEffect(() => {
        if (location.pathname === '/') {
            localStorage.removeItem('accessToken');
        }
    }, [location.pathname]);

    const handleRegister = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email or password is empty
        if (!email || !password) {
            setToastMessage('Please enter both email and password.');
            setToastVariant('warning');
            setShowToast(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('accessToken', token);
                navigate('/BystatusTasks');
                setToastMessage('Login successful!');
                setToastVariant('success');
                setShowToast(true);
            } else {
                setToastMessage('Login failed. Please try again.');
                setToastVariant('danger');
                setShowToast(true);
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            setToastMessage('An error occurred during login. Please try again later.');
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="login-form p-5 rounded shadow bg-dark" style={{ width: '400px', border: 'none' }}>
                <h3 className="text-center mb-4 text-light">Welcome Back!</h3>
                <Form onSubmit={handleSubmit} className="bg-transparent">
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label className="text-light">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-pill"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label className="text-light">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-pill"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 rounded-pill mb-3">
                        Login
                    </Button>

                    <Button variant="outline-primary" className="w-100 rounded-pill" onClick={handleRegister}>
                        Sign Up
                    </Button>
                </Form>
            </div>
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    minWidth: 200,
                }}
                delay={3000}
                autohide
                variant={toastVariant}
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </Container>
    );
};

export default Login;
