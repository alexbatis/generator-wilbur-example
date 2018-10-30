import { prop, Typegoose, ModelType, InstanceType } from "typegoose";
import { JsonObject, JsonProperty } from "json2typescript";
import { validate, IsString, IsNotEmpty } from "class-validator";


interface ICourse {
    name?: string;
    subject?: string;
    description?: string;
}

@JsonObject
export class Course extends Typegoose {
    @IsString()
    @IsNotEmpty()
    @JsonProperty("name", String)
    @prop()
    name: string;

    @IsString()
    @IsNotEmpty()
    @JsonProperty("subject", String)
    @prop()
    subject: string;

    @IsString()
    @IsNotEmpty()
    @JsonProperty("description", String)
    @prop()
    description: string;

    constructor(course?: ICourse) {
        super();
        this.name = course && course.name || null;
        this.subject = course && course.subject || null;
        this.description = course && course.description || null;
    }

    async validate() {
        const errors = await validate(this);
        if (errors.length) throw errors;
        return true;
    }

    async updateAndValidate(updatedCourse?: ICourse) {
        this.name = updatedCourse && updatedCourse.name || this.name;
        this.subject = updatedCourse && updatedCourse.subject || this.subject;
        this.description = updatedCourse && updatedCourse.description || this.description;
        await this.validate();
        return true;
    }
}

export const CourseModel = new Course().getModelForClass(Course, { schemaOptions: { timestamps: true } });