import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
  } from "class-validator";
  
  import { Job } from "../../entity/Job";
  
  @ValidatorConstraint({ async: true })
  export class IsJobAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    validate(job: string) {
      return Job.findOne({ where: { job } }).then(job => {
        if (job) return false;
        return true;
      });
    }
  }
  
  export function IsJobAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsJobAlreadyExistConstraint
      });
    };
  }