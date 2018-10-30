import * as express from "express";
import * as expressValidator from "express-validator";
import { professorController, professorValidator } from "@controllers";

export const ProfessorRouter = express.Router()
    .use(expressValidator())
    .get("/", professorController.all)
    .get("/:id", professorValidator.validateMongoID, professorController.byId)
    .post("/", professorValidator.validatePost, professorController.create)
    .put("/:id", professorValidator.validatePut, professorValidator.validateMongoID, professorController.update)
    .delete("/:id", professorValidator.validateMongoID, professorController.delete);
