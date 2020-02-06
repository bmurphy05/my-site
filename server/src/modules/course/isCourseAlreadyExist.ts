import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
  } from "class-validator";
  
  import { Course } from "../../entity/Course";
  
  @ValidatorConstraint({ async: true })
  export class IsCourseAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    validate(course: string) {
      return Course.findOne({ where: { course } }).then(course => {
        if (course) return false;
        return true;
      });
    }
  }
  
  export function IsCourseAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsCourseAlreadyExistConstraint
      });
    };
  }