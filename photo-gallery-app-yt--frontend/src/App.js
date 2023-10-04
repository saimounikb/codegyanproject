import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "axios";
import Button from "./components/Button";
import "./index.css"; // Import your CSS file with background styles

function App() {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get("http://13.48.84.96:5000/api/get")
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const handlePhotoDelete = (photoId) => {
    console.log("Deleting photo with ID:", photoId);
    // Make a DELETE request to delete the photo
    axios
      .delete(`http://13.48.84.96:5000/api/delete/${photoId}`)
      .then((res) => {
        console.log(res.data);
        // Refresh the photo gallery after deletion
        setUpdateUI(photoId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Router>
      <div className="App">
        <Navbar token={token} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Grid photos={photos} onDelete={handlePhotoDelete} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route
            path="/login"
            element={
              !token ? <Login setToken={setToken} /> : <Navigate to="/" />
            }
          />
        </Routes>
        {token && <Button setUpdateUI={setUpdateUI} />}
      </div>
    </Router>
  );
}

export default App;
