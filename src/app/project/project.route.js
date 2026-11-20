import { Router } from "express";
import protect from "../../lib/auth/protect.js";
import { uploadFields } from "../../lib/media/multer.js";
const projectRouter = Router();
import * as projectController from "./projects.controller.js";
projectRouter.get("/featured", projectController.getFeaturedProjects);
projectRouter.get("/category/:stack", projectController.getProjectByStack);
projectRouter
  .route("/")
  .post(
    protect,
    uploadFields([
      { name: "image", maxCount: 1 },
      { name: "gallery", maxCount: 10 },
    ]),
    projectController.createProject,
  )
  .get(projectController.getProjects);
projectRouter
  .route("/:id")
  .get(projectController.getSingleProject)
  .delete(protect, projectController.deleteProject)
  .patch(protect, projectController.editProject);
export default projectRouter;
