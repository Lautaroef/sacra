import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/uploadImage";
import {
  getInstitutions,
  getInstitution,
  createInstitution,
  updateInstitution,
} from "./controllers/institutions";

const routes = Router();

routes.get("/orphanages", getInstitutions);
routes.post("/orphanages", createInstitution);
routes.get("/orphanages/:id", getInstitution, updateInstitution);
// routes.post("/orphanages", upload.array("images"), createInstitution);

export default routes;
