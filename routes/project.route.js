const express = require("express");
const {
  getProducts,
  getFeaturedProducts,
  getProductByStack,
  getSingleProduct,
  createProject,
  deleteProject,
  editProject,
} = require("../controllers/projects.controller");
const multer = require("multer");
const { protect } = require("../middleware/protect");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:stack", getProductByStack);
router.get("/:id", getSingleProduct);
router.post("/", protect, upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]), createProject);
router.delete("/:id", protect, deleteProject);
router.patch("/:id", protect, editProject);
module.exports = router;
