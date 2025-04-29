import { Injectable } from '@nestjs/common';
import * as joi from 'joi';
import { JoiValidationPipe } from 'package/validation/joi.pips';
import { id } from 'package/validation/schema';
import { Roles } from 'src/user/data/user.schema';

@Injectable()
export class UserValidation {
  create({ body }) {
    const create = joi.object({
      username: joi.string().min(4).required(),
      password: joi.string().min(4).required(),
      role: joi
        .string()
        .valid(...Object.values(Roles))
        .required(),
    });

    return new JoiValidationPipe(create).transform(body);
  }
}
