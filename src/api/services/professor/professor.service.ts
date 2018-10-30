import { ABError, Professor, ProfessorModel } from "@models";

export class ProfessorService {
    async all(): Promise<Professor[]> {
        const professors: Professor[] = await ProfessorModel.find({});
        return professors;
    }

    async byID(id: string): Promise<Professor> {
        const professor: Professor = await ProfessorModel.findById(id);
        if (!professor) throw new ABError({ "status": 404, "error": `Could not retrieve professor with id ${id}` });
        return professor;
    }

    async update(id: string, updatedProfessor: Professor): Promise<Professor> {
        const existingProfessor: Professor = await ProfessorModel.findById(id);
        if (!existingProfessor) throw new ABError({ "status": 404, "error": `Could not retrieve professor with id ${id}` });
        const updatedProfessorToValidate = new Professor(existingProfessor);
        await updatedProfessorToValidate.updateAndValidate(updatedProfessor);
        const professor: Professor = await ProfessorModel.findByIdAndUpdate(id, updatedProfessorToValidate, { new: true });
        return professor;
    }

    async create(professor: Professor): Promise<Professor> {
        await this.validateProfessor(professor);
        const professorToAdd = new ProfessorModel(professor);
        const createdProfessor = await professorToAdd.save();
        return createdProfessor;
    }

    async delete(id: string): Promise<Professor> {
        const professor: Professor = await ProfessorModel.findByIdAndRemove(id);
        if (!professor) throw new ABError({ "status": 404, "error": `Could not delete professor with id ${id}` });
        return professor;
    }

    async validateProfessor(professor: any) {
        const professorToValidate = new Professor(professor);
        try { await professorToValidate.validate(); }
        catch (err) { throw new ABError({ error: err, status: 400, message: "Bad Request" }); }
    }

}

// Exported Instance
export const professorService = new ProfessorService();

