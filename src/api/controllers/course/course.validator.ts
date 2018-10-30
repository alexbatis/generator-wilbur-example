// tslint:disable:indent
// tslint:disable:no-trailing-whitespace
import { Request, Response, NextFunction } from "express";
import { controllerService } from "@services";

class CourseValidator {
    validateMongoID(req: Request, res: Response, next: NextFunction) {
        req.checkParams("id", "Must include a valid MongoDB objectID in the request url.").isMongoId();
        controllerService.assessErrors(req, res, next, req.validationErrors(), "Bad Request: invalid id");
    }

    validatePost(req: Request, res: Response, next: NextFunction) {
        controllerService.assessErrors(req, res, next, req.validationErrors(), "Bad Request");
    }

    validatePut(req: Request, res: Response, next: NextFunction) {
        if (typeof req.body.name !== "undefined") { 
            req.checkBody("name").isString().withMessage("'name' must be a string value.");         
            req.checkBody("name").not().isEmpty().withMessage("'name' must not be empty.");        
        }
    
        if (typeof req.body.subject !== "undefined") { 
            req.checkBody("subject").isString().withMessage("'subject' must be a string value.");         
            req.checkBody("subject").not().isEmpty().withMessage("'subject' must not be empty.");        
        }
    
        if (typeof req.body.description !== "undefined") { 
            req.checkBody("description").isString().withMessage("'description' must be a string value.");         
            req.checkBody("description").not().isEmpty().withMessage("'description' must not be empty.");        
        }
            
    
    controllerService.assessErrors(req, res, next, req.validationErrors(), "Bad Request");
    }
}


// Exported Instance
export const courseValidator = new CourseValidator();
