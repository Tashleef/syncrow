import { Params } from '../../../../package/component/params/params';
import { Injectable } from '@nestjs/common';
import * as joi from 'joi';

import { DeviceType } from '../../enums/device.enums';
import { JoiValidationPipe } from 'package/validation/joi.pips';
import { validationSchema } from 'package/validation';
import { pagination } from 'package/pagination/validation';
import { DeviceDto, GetAllDevices } from '../dto/device.dto';
@Injectable()
export class DeviceValidation {
  create({ body }: { body: DeviceDto }) {
    const createDeviceSchema = joi
      .object({
        name: joi.string().min(4).required(),
        description: joi.number().min(10),
        type: joi
          .string()
          .valid(...Object.values(DeviceType))
          .required(),
        location: joi
          .object({
            lng: joi.number().required(),
            lat: joi.number().required(),
          })
          .required(),
      })
      .required();
    return new JoiValidationPipe(createDeviceSchema).transform(body);
  }

  update({ body, params }: { body: Partial<DeviceDto>; params: Params }) {
    const update = joi.object({
      name: joi.string().min(4),
      description: joi.number().min(10),
      type: joi.string().valid(...Object.values(DeviceType)),
      location: joi.object({
        lng: joi.number(),
        lat: joi.number(),
      }),
    });

    this.paramsId({ params });
    return new JoiValidationPipe(update).transform(body);
  }

  paramsId({ params }: { params: Params }) {
    const paramsId = joi.object({ id: validationSchema.id().required() });
    return new JoiValidationPipe(paramsId).transform(params);
  }

  getAllDevices({ query }: { query: GetAllDevices }) {
    const getAll = joi.object({
      ...pagination(),
      search: joi.string(),
      type: joi.string().valid(...Object.values(DeviceType)),
    });

    return new JoiValidationPipe(getAll).transform(query);
  }
}
