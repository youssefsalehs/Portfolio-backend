import * as projectService from "./project.service.js";
import { validate } from "../../lib/validation/validation.js";
import { createProjectDto, updateProjectDto } from "./project.dto.js";
export const getProjects = async (req, res, next) => {
  try {
    const { page: currentPage, limit: currentLimit, ...filters } = req.query;
    const { projects, total, page, limit } = await projectService.getProjects(
      filters,
      currentPage,
      currentLimit,
    );

    return res.status(200).json({
      status: "success",
      data: projects,
      metaData: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
};
export const getSingleProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.getSingleProject(id);

    return res.status(200).json({
      status: "success",
      data: project,
    });
  } catch (error) {
    return next(error);
  }
};
export const getFeaturedProjects = async (req, res, next) => {
  try {
    const { projects, total, page, limit } =
      await projectService.getFeaturedProjects();
    return res.status(200).json({
      status: "success",
      data: projects,
      metaData: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
};
export const getProjectByStack = async (req, res, next) => {
  try {
    const { stack, page: currentPage, limit: currentLimit } = req.params;
    const { projects, total, page, limit } =
      await projectService.getProjectByStack(stack, currentPage, currentLimit);
    console.log(projects, total, page, limit);
    return res.status(200).json({
      status: "success",
      data: projects,
      metaData: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
};
export const createProject = async (req, res, next) => {
  try {
    const data = validate(createProjectDto, req.body);
    console.log(data, req.body);
    const newProject = await projectService.createProject(data, req.files);
    return res.status(201).json({
      status: "success",
      data: newProject,
    });
  } catch (error) {
    return next(error);
  }
};
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(id);
    return res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
export const editProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    const data = validate(updateProjectDto, req.body);
    console.log(data);
    const updatedProject = await projectService.editProject(id, data);

    return res.status(200).json({
      status: "success",
      data: updatedProject,
    });
  } catch (error) {
    return next(error);
  }
};
