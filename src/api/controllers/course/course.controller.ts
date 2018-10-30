
import { Request, Response } from "express";
import { courseService, controllerService } from "@services";

export class CourseController {
    async all(req: Request, res: Response) {
        try {
            const courses = await courseService.all();
            res.json(courses);
        } catch (err) { controllerService.handleError(err, res); }
    }

    async byId(req: Request, res: Response) {
        try {
            const course = await courseService.byID(req.params.id);
            res.json(course);
        } catch (err) { controllerService.handleError(err, res); }
    }

    async create(req: Request, res: Response) {
        try {
            const course = await courseService.create(req.body);
            res.status(201).json(course);
        } catch (err) { controllerService.handleError(err, res); }
    }

    async update(req: Request, res: Response) {
        try {
            const course = await courseService.update(req.params.id, req.body);
            res.json(course);
        } catch (err) { controllerService.handleError(err, res); }

    }

    async delete(req: Request, res: Response) {
        try {
            const course = await courseService.delete(req.params.id);
            res.status(204).send();
        } catch (err) { controllerService.handleError(err, res); }
    }
}

// Exported Instance
export const courseController = new CourseController();
