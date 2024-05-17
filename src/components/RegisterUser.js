import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const RegisterUser = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validating email format
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

    if (email && email.length && email.match(emailRegExp)) {
      // Set email state only if it's valid
      setEmail(email);
    } else {
      // Notify user about invalid email
      toast.error("Invalid email address");
      setLoading(false); // Reset loading state
      return; // Exit the function early since the email is invalid
    }

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userRole", userRole);
    formData.append("profilePic", profilePic);

    try {
      // Make API call
      const response = await axios.post(
        "http://localhost:5000/api/register/user",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.message === "success") {
        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setUserRole("");
        setProfilePic("");

        // Show success toast
        toast.success("Register Successful");

        // Navigate to login page
        setTimeout(() => navigate("/login"), 2000);
      } else if (response.data.message === "email_exists") {
        // Handle case where email already exists
        toast.error("Email already exists. Please use a different email.");
      } else {
        // Show error toast
        toast.error("There is an error");
        console.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const MAX_FILE_SIZE_MB = 1;
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    } else if (!file.type.includes("image")) {
      toast.error(`File should be of Image type only`);
    } else {
      setProfilePic(file);
    }
  };

  return (
    <div className="container vh-100 ">
      <div className="row justify-content-center align-items-center vh-100 w-1000" >
        <div className="col-md-6">
          <div className="sign-in__wrapper">
            <div className="sign-in__backdrop"></div>
            <Form
              name="form"
              className="shadow p-4 bg-dark rounded"
              onSubmit={handleFormSubmit}
            >
              <div className="h4 mb-0 text-center text-light">Sign In</div>
              <Form.Group className="mb-2" controlId="Name">
                <Form.Label className="text-light">Name</Form.Label>
                <Form.Control
                  type="text"
                  value={Name}
                  placeholder="First Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-pill bg-dark text-light"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="email">
                <Form.Label className="text-light">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-pill bg-dark text-light"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="password">
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-pill bg-dark text-light"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="userRole">
                <Form.Label className="text-light">User Role</Form.Label>
                <Form.Control
                  as="select"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="rounded-pill bg-dark text-light"
                >
                  <option value="">select your role</option>
                  <option value="assigner">assigner</option>
                  <option value="assignee">assignee</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-2" controlId="profilePic">
                <Form.Label className="text-light">Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  required
                  className="bg-dark text-light"
                />
              </Form.Group>

              <Button
                className="w-100 rounded-pill bg-primary"
                variant="primary"
                type="submit"
                onChange={handleFormSubmit}
              >
                Register
              </Button>
              <Button
                className="w-100 mt-3 rounded-pill bg-secondary"
                variant="secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default RegisterUser;
