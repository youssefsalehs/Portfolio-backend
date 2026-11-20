import Project from "./project.model.js";

export const getProjects = async (query = {}, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Project.countDocuments(query),
  ]);

  return { projects, total, page, limit };
};

export const getSingleProject = async (filter = {}) => {
  return await Project.findOne(filter);
};

export const createProject = async (data) => {
  return await Project.create(data);
};

export const deleteProject = async (filter) => {
  return await Project.deleteOne(filter);
};

export const updateProject = async (filter, data, options = {}) => {
  return await Project.updateProject(filter, data, options);
};
