const express = require("express");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/single",upload.single("image"),(req, res) => {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    if (!req.file) {    
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      imageUrl: imageUrl, 
      file: req.file,
    });
  }
);

module.exports = router;