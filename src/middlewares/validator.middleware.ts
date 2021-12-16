import { celebrate, SchemaOptions } from 'celebrate';
import Joi from 'joi';

const celebrateOptions: Joi.ValidationOptions = {
  abortEarly: false,
  allowUnknown: true
};

export const validateSchema = (schema: SchemaOptions, options?: Joi.ValidationOptions) =>
  celebrate(schema, options ? options : celebrateOptions);
