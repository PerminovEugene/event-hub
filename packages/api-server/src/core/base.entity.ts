import { validateOrReject, ValidationError } from 'class-validator';
import { ValidationEntityError } from '../errors/validation-entity.error';

export abstract class BaseEntity {
  public async validate() {
    // Promise there because can't annotate error in try catch block
    return new Promise((resolve, reject) => {
      validateOrReject(this)
        .then(result => {
          resolve();
        })
        .catch((errors: ValidationError[]) => {
          reject(new ValidationEntityError(errors));
        });
    });
  }
}
