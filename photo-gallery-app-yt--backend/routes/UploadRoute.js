const { Router } = require("express");
const uploadMiddleware = require("../middlewares/MulterMiddleware");
const UploadModel = require("../models/UploadModel");

const router = Router();

router.get("/api/get", async (req, res) => {
  const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
  res.send(allPhotos);
});

router.post("/api/save", uploadMiddleware.single("photo"), (req, res) => {
  const photo = req.file.filename;

  console.log(photo);

  UploadModel.create({ photo })
    .then((data) => {
      console.log("Uploaded Successfully...");
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

router.delete("/api/delete/:photoId", async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const deletedPhoto = await UploadModel.findByIdAndRemove(photoId);

    if (!deletedPhoto) {
      return res.status(404).json({ error: "Photo not found" });
    }

    // Optionally, you can also delete the actual file from your server here

    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Photo deletion failed" });
  }
});
module.exports = router;
