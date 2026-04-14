const cloudinary = require("../config/cloudinary");
const Project = require("../models/project.model");

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
    const projects = await Project.find({ featured: true });
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
      sections,
    } = req.body;
    const project = await Project.findOne({
      $and: [{ githubLink }, { liveLink }],
    });
    if (project) {
      return res.status(400).json({
        status: "failed",
        message: "Project already exists",
      });
    }
    const parsedSections =
      typeof sections === "string" ? JSON.parse(sections) : sections;
    const parsedStack = typeof stack === "string" ? JSON.parse(stack) : stack;
    const parsedTechnologies =
      typeof technologies === "string"
        ? JSON.parse(technologies)
        : technologies;
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ status: "failed", message: "No image provided" });
    }

    const uploadImage = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "projects",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        stream.end(file.buffer);
      });
    };

    const result = await uploadImage();

    const image = { url: result.secure_url, public_id: result.public_id };

    const newProject = await Project.create({
      title,
      description,
      subtitle,
      slug,
      subtitle,
      image,
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
      sections: parsedSections,
    });
    return res.status(201).json({
      status: "success",
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
    const body = req.body;
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
      sections,
    } = body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        status: "failed",
        message: "Project not found",
      });
    }

    const existing = await Project.findOne({
      _id: { $ne: id },
      $and: [{ githubLink }, { liveLink }],
    });

    if (existing) {
      return res.status(400).json({
        status: "failed",
        message: "Another project already uses this link",
      });
    }

    const parsedSections =
      typeof sections === "string" ? JSON.parse(sections) : sections;

    const parsedStack = typeof stack === "string" ? JSON.parse(stack) : stack;

    const parsedTechnologies =
      typeof technologies === "string"
        ? JSON.parse(technologies)
        : technologies;

    let image = project.image;

    if (req.file) {
      if (project.image?.public_id) {
        await cloudinary.uploader.destroy(project.image.public_id);
      }

      const uploadImage = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "projects",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          stream.end(req.file.buffer);
        });
      };

      const result = await uploadImage();

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
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
        image,
        technologies: parsedTechnologies,
        stack: parsedStack,
        sections: parsedSections,
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
