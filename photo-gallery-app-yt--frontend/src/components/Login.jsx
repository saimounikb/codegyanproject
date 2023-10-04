import React, { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [resetForm, setResetForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://13.48.84.96:5000/api/login", formData)
      .then((response) => {
        // Handle successful login
        console.log("Login successful", response.data);
        setToken(response.data.token); // Set the JWT token in your app state
      })
      .catch((error) => {
        // Handle login error
        console.error("Login error", error);
        setErrorMessage("Invalid details. Please try again.");
        setResetForm(true);
      });
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={resetForm ? "" : formData.username}
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
            onChange={handleChange}
            value={resetForm ? "" : formData.password}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "beige",
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
  errorMessage: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Login;
