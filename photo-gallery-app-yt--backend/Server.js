const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const UploadRoute = require("./routes/UploadRoute");
const AuthRoute = require("./routes/auth");

mongoose.set("strictQuery", false); // Suppress the Mongoose DeprecationWarning

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Add DELETE to the allowed methods
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://saimounikgupta346:saimounik@cluster0.1zu4fza.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp",
  () => {
    console.log("MongoDB Connected...");
  }
);

app.use(UploadRoute);
app.use(AuthRoute);
app.delete("/api/delete/:id", (req, res) => {
  const photoId = req.params.id;
  // Implement your logic to delete the photo with the given ID
  // Example: deletePhoto(photoId);

  // Send a response indicating success or failure
  res.json({ success: true }); // Modify this response as needed
});
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
