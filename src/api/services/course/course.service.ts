import { ABError, Course, CourseModel } from "@models";

export class CourseService {
    async all(): Promise<Course[]> {
        const courses: Course[] = await CourseModel.find({});
        return courses;
    }

    async byID(id: string): Promise<Course> {
        const course: Course = await CourseModel.findById(id);
        if (!course) throw new ABError({ "status": 404, "error": `Could not retrieve course with id ${id}` });
        return course;
    }

    async update(id: string, updatedCourse: Course): Promise<Course> {
        const existingCourse: Course = await CourseModel.findById(id);
        if (!existingCourse) throw new ABError({ "status": 404, "error": `Could not retrieve course with id ${id}` });
        const updatedCourseToValidate = new Course(existingCourse);
        await updatedCourseToValidate.updateAndValidate(updatedCourse);
        const course: Course = await CourseModel.findByIdAndUpdate(id, updatedCourseToValidate, { new: true });
        return course;
    }

    async create(course: Course): Promise<Course> {
        await this.validateCourse(course);
        const courseToAdd = new CourseModel(course);
        const createdCourse = await courseToAdd.save();
        return createdCourse;
    }

    async delete(id: string): Promise<Course> {
        const course: Course = await CourseModel.findByIdAndRemove(id);
        if (!course) throw new ABError({ "status": 404, "error": `Could not delete course with id ${id}` });
        return course;
    }

    async validateCourse(course: any) {
        const courseToValidate = new Course(course);
        try { await courseToValidate.validate(); }
        catch (err) { throw new ABError({ error: err, status: 400, message: "Bad Request" }); }
    }

}

// Exported Instance
export const courseService = new CourseService();

