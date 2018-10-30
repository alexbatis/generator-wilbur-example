
import { Request, Response } from "express";
import { professorService, controllerService } from "@services";

export class ProfessorController {
    async all(req: Request, res: Response) {
        try {
            const professors = await professorService.all();
            res.json(professors);
        } catch (err) { controllerService.handleError(err, res); }
    }

    async byId(req: Request, res: Response) {
        try {
            const professor = await professorService.byID(req.params.id);
            res.json(professor);
        } catch (err) { controllerService.handleError(err, res); }
    }

    async create(req: Request, res: Response) {
        try {
            const professor = await professorService.create(req.body);
            res.status(201).json(professor);
        } catch (err) { controllerService.handleError(err, res); }
    }

    async update(req: Request, res: Response) {
        try {
            const professor = await professorService.update(req.params.id, req.body);
            res.json(professor);
        } catch (err) { controllerService.handleError(err, res); }

    }

    async delete(req: Request, res: Response) {
        try {
            const professor = await professorService.delete(req.params.id);
            res.status(204).send();
        } catch (err) { controllerService.handleError(err, res); }
    }
}

// Exported Instance
export const professorController = new ProfessorController();
