import React, { useState } from "react";
import axios from "axios";

const Register = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://13.48.84.96:5000/api/register", formData)
      .then((response) => {
        // Handle successful registration
        console.log("Registration successful", response.data);
        alert("Registration successful")
        setToken(response.data.token); // Set the token using the prop
        setRegistrationSuccess(true); // Show registration success message
        // Reset the form after a short delay (adjust the delay as needed)
        setTimeout(() => {
          setRegistrationSuccess(false);
          setFormData({
            username: "",
            password: "",
          }); // Reset the form fields
        }, 1000); // Display success message for 3 seconds
      })
      .catch((error) => {
        // Handle registration error
        console.error("Registration error", error);
      });
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username} // Controlled input
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password} // Controlled input
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      {registrationSuccess && (
        <div className="registration-success-message">
          {/* Use a modal or alert here to display the success message */}
          {/* For simplicity, using the built-in alert */}
          <script>alert("Successful Registration!");</script>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "5px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  },
  formGroup: {
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "5px",
    borderRadius: "3px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "3px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Register;
