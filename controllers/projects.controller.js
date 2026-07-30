const cloudinary = require("../config/cloudinary");
const Project = require("../models/project.model");
const { uploadBuffer } = require("../utils/uploadHelper");

const getProducts = async (req, res) => {
  try {
    const projects = await Project.find();

    return res.status(200).json({
      status: "success",
      results: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    return res.status(200).json({
      status: "success",

      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
const getFeaturedProducts = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).limit(6);
    return res.status(200).json({
      status: "success",
      results: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
const getProductByStack = async (req, res) => {
  try {
    const { stack } = req.params;
    const projects = await Project.find({ stack });

    return res.status(200).json({
      status: "success",
      results: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      slug,
      technologies,
      subtitle,
      githubLink,
      liveLink,
      stack,
      featured,
      priority,
      year,
      duration,
      role,
      status,
      overview,
      challenges,
      features,
      learnings,
    } = req.body;

    const existingProject = await Project.findOne({
      $or: [{ githubLink }, { liveLink }],
    });

    if (existingProject) {
      return res.status(400).json({
        status: "failed",
        message: "Project already exists",
      });
    }

    const parsedStack =
      typeof stack === "string" ? JSON.parse(stack) : stack;

    const parsedTechnologies =
      typeof technologies === "string"
        ? JSON.parse(technologies)
        : technologies;

    const parsedChallenges =
      typeof challenges === "string"
        ? JSON.parse(challenges)
        : challenges;

    const parsedFeatures =
      typeof features === "string"
        ? JSON.parse(features)
        : features;

    const parsedLearnings =
      typeof learnings === "string"
        ? JSON.parse(learnings)
        : learnings;



    const coverFile = req.files?.image?.[0];
    const galleryFiles = req.files?.gallery || [];

    let image = {};

    if (coverFile) {
      const result = await uploadBuffer(
        coverFile.buffer,
        "projects"
      );

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const gallery = await Promise.all(
      galleryFiles.map(async (file) => {
        const result = await uploadBuffer(
          file.buffer,
          "projects/gallery"
        );

        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    const newProject = await Project.create({
      title,
      description,
      subtitle,
      slug,
      image,
      gallery,
      technologies: parsedTechnologies,
      githubLink,
      liveLink,
      stack: parsedStack,
      featured,
      priority,
      year,
      duration,
      role,
      status,
      overview,
      challenges: parsedChallenges,
      features: parsedFeatures,
      learnings: parsedLearnings,
    });

    return res.status(201).json({
      status: "success",
      data: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        status: "failed",
        message: "Project not found",
      });
    }

    await cloudinary.uploader.destroy(project.image.public_id);
    await Project.deleteOne({ _id: id });

    return res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
const editProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      slug,
      technologies,
      subtitle,
      githubLink,
      liveLink,
      stack,
      featured,
      priority,
      year,
      duration,
      role,
      status,
      challenges,
      overview,
      features,
      learnings,
    } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        status: "failed",
        message: "Project not found",
      });
    }

    const existing = await Project.findOne({
      _id: { $ne: id },
      $or: [{ githubLink }, { liveLink }],
    });

    if (existing) {
      return res.status(400).json({
        status: "failed",
        message: "Another project already uses this link",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        slug,
        subtitle,
        githubLink,
        liveLink,
        featured,
        priority,
        year,
        duration,
        role,
        status,
        technologies,
        stack,
        challenges,
        features,
        learnings,
        overview,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      status: "success",
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductByStack,
  getSingleProduct,
  createProject,
  deleteProject,
  editProject,
};
