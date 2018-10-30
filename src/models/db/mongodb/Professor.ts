import { prop, Typegoose, ModelType, InstanceType } from "typegoose";
import { JsonObject, JsonProperty } from "json2typescript";
import { validate, MinLength, MaxLength, IsString, IsNotEmpty, IsInt, IsPositive } from "class-validator";


interface IProfessor {
    professorID?: string;
    firstName?: string;
    lastName?: string;
    coursesTaught?: number;
}

@JsonObject
export class Professor extends Typegoose {
    @MinLength(8)
    @MaxLength(8)
    @IsString()
    @JsonProperty("professorID", String)
    @prop({ unique: true })
    professorID: string;

    @IsString()
    @IsNotEmpty()
    @JsonProperty("firstName", String)
    @prop()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @JsonProperty("lastName", String)
    @prop()
    lastName: string;

    @IsInt()
    @IsPositive()
    @JsonProperty("coursesTaught", Number)
    @prop()
    coursesTaught: number;

    constructor(professor?: IProfessor) {
        super();
        this.professorID = professor && professor.professorID || null;
        this.firstName = professor && professor.firstName || null;
        this.lastName = professor && professor.lastName || null;
        this.coursesTaught = professor && professor.coursesTaught || null;
    }

    async validate() {
        const errors = await validate(this);
        if (errors.length) throw errors;
        return true;
    }

    async updateAndValidate(updatedProfessor?: IProfessor) {
        this.professorID = updatedProfessor && updatedProfessor.professorID || this.professorID;
        this.firstName = updatedProfessor && updatedProfessor.firstName || this.firstName;
        this.lastName = updatedProfessor && updatedProfessor.lastName || this.lastName;
        this.coursesTaught = updatedProfessor && updatedProfessor.coursesTaught || this.coursesTaught;
        await this.validate();
        return true;
    }
}

export const ProfessorModel = new Professor().getModelForClass(Professor, { schemaOptions: { timestamps: true } });