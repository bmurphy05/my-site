import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
  } from "class-validator";
  
  import { Project } from "../../entity/Project";
  
  @ValidatorConstraint({ async: true })
  export class IsProjectAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    validate(project: string) {
      return Project.findOne({ where: { project } }).then(project => {
        if (project) return false;
        return true;
      });
    }
  }
  
  export function IsProjectAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsProjectAlreadyExistConstraint
      });
    };
  }