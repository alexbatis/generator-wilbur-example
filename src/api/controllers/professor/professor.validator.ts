// tslint:disable:indent
// tslint:disable:no-trailing-whitespace
import { Request, Response, NextFunction } from "express";
import { controllerService } from "@services";

class ProfessorValidator {
    validateMongoID(req: Request, res: Response, next: NextFunction) {
        req.checkParams("id", "Must include a valid MongoDB objectID in the request url.").isMongoId();
        controllerService.assessErrors(req, res, next, req.validationErrors(), "Bad Request: invalid id");
    }

    validatePost(req: Request, res: Response, next: NextFunction) {
        controllerService.assessErrors(req, res, next, req.validationErrors(), "Bad Request");
    }

    validatePut(req: Request, res: Response, next: NextFunction) {
        if (typeof req.body.professorID !== "undefined") { 
                     
                     
                     
            req.checkBody("professorID").isString().withMessage("'professorID' must be a string value.");        
        }
    
        if (typeof req.body.firstName !== "undefined") { 
            req.checkBody("firstName").isString().withMessage("'firstName' must be a string value.");         
            req.checkBody("firstName").not().isEmpty().withMessage("'firstName' must not be empty.");        
        }
    
        if (typeof req.body.lastName !== "undefined") { 
            req.checkBody("lastName").isString().withMessage("'lastName' must be a string value.");         
            req.checkBody("lastName").not().isEmpty().withMessage("'lastName' must not be empty.");        
        }
    
        if (typeof req.body.coursesTaught !== "undefined") { 
            req.checkBody("coursesTaught").isInt().withMessage("'coursesTaught' must be an integer value.");         
                    
        }
            
    
    controllerService.assessErrors(req, res, next, req.validationErrors(), "Bad Request");
    }
}


// Exported Instance
export const professorValidator = new ProfessorValidator();
