import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
  } from "class-validator";
  
  import { Skill } from "../../entity/Skill";
  
  @ValidatorConstraint({ async: true })
  export class IsSkillAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    validate(skill: string) {
      return Skill.findOne({ where: { skill } }).then(skill => {
        if (skill) return false;
        return true;
      });
    }
  }
  
  export function IsSkillAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsSkillAlreadyExistConstraint
      });
    };
  }