import * as express from "express";
import * as expressValidator from "express-validator";
import { courseController, courseValidator } from "@controllers";

export const CourseRouter = express.Router()
    .use(expressValidator())
    .get("/", courseController.all)
    .get("/:id", courseValidator.validateMongoID, courseController.byId)
    .post("/", courseValidator.validatePost, courseController.create)
    .put("/:id", courseValidator.validatePut, courseValidator.validateMongoID, courseController.update)
    .delete("/:id", courseValidator.validateMongoID, courseController.delete);
