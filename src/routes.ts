import { Application } from "express";
import {
  GeneralRouter,
  ApiRootRouter,
  ProfessorRouter,
  CourseRouter
} from "@controllers";

export const routes = function (app: Application): void {
  app.use("/", GeneralRouter);
  app.use("/api/v1/", ApiRootRouter);
  app.use("/api/v1/professors", ProfessorRouter);
  app.use("/api/v1/courses", CourseRouter);
};
