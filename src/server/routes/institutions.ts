import { Router } from "express";
import uploadImage from "../config/uploadImage";
import {
  getInstitutions,
  getInstitution,
  createInstitution,
  updateInstitution,
} from "../controllers/institutions";

const routes = Router();

routes.get("/", getInstitutions);
routes.post("/", createInstitution);
routes.get("/:id", getInstitution, updateInstitution);
// routes.post("/", upload.array("images"), createInstitution);

export default routes;
