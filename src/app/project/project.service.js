import { cloudinaryProvider } from "../../lib/cloud/cloudinarProvider.js";
import {
  projectAlreadyExists,
  projectExistsWithExactLink,
  projectNotFound,
} from "./errors.js";
import * as projectRepository from "./project.repo.js";
export const getProjects = async (
  filters = {},
  currentPage = 1,
  currentLimit = 10,
) => {
  const query = {};

  if (filters.stack) query.stack = filters.stack;
  if (filters.status) query.status = filters.status;
  if (filters.year) query.year = filters.year;
  if (filters.featured !== undefined)
    query.featured = filters.featured === "true" || filters.featured === true;
  if (filters.technologies) {
    const techs = Array.isArray(filters.technologies)
      ? filters.technologies
      : filters.technologies.split(",").map((t) => t.trim());
    query.technologies = { $in: techs };
  }
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: "i" } },
      { description: { $regex: filters.search, $options: "i" } },
    ];
  }

  const { projects, total, page, limit } = await projectRepository.getProjects(
    query,
    Number(currentPage),
    Number(currentLimit),
  );
  return { projects, total, page, limit };
};
export const getSingleProject = async (id) => {
  const project = await projectRepository.getSingleProject({ _id: id });
  return project;
};

export const getFeaturedProjects = async () => {
  const { projects, total, page, limit } = await projectRepository.getProjects(
    { featured: true },
    1,
    6,
  );
  return { projects, total, page, limit };
};
export const getProjectByStack = async (
  stack,
  currentPage = 1,
  currentLimit = 10,
) => {
  const { projects, total, page, limit } = await projectRepository.getProjects(
    { stack },
    Number(currentPage),
    Number(currentLimit),
  );

  return { projects, total, page, limit };
};
export const createProject = async (data, files) => {
  const existingProject = await projectRepository.getSingleProject({
    $or: [{ githubLink: data.githubLink }, { liveLink: data.liveLink }],
  });

  if (existingProject) {
    throw projectAlreadyExists;
  }

  const coverFile = files?.image?.[0];
  const galleryFiles = files?.gallery || [];

  let image = {};

  if (coverFile) {
    const result = await cloudinaryProvider.uploadFile(
      coverFile,
      `projects/coverPic`,
    );

    image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const gallery = await Promise.all(
    galleryFiles.map(async (file) => {
      const result = await cloudinaryProvider.uploadFile(
        file,
        `projects/gallery`,
      );

      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }),
  );

  const newProject = await projectRepository.createProject({
    ...data,
    image,
    gallery,
  });

  return newProject;
};
export const deleteProject = async (id) => {
  const project = await projectRepository.getSingleProject({ _id: id });
  if (!project) {
    throw projectNotFound;
  }

  await cloudinaryProvider.deleteFile(project.image.public_id);
  const gallery = project.gallery;
  await Promise.all(
    gallery.map(async (img) => {
      await cloudinaryProvider.deleteFile(img.public_id);
    }),
  );
  await projectRepository.deleteProject({ _id: id });
};
export const editProject = async (id, data) => {
  const project = await projectRepository.getSingleProject({ _id: id });

  if (!project) {
    throw projectNotFound;
  }

  const existing = await projectRepository.getSingleProject({
    _id: { $ne: id },
    $or: [{ githubLink: data.githubink }, { liveLink: data.liveLink }],
  });

  if (existing) {
    throw projectExistsWithExactLink;
  }

  const updatedProject = await projectRepository.updateProject(
    { _id: id },
    data,
    {
      returnDocument: "after",
    },
  );

  return updatedProject;
};
