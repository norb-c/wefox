import { Segments, Joi, SchemaOptions } from 'celebrate';

export const loginSchema: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required()
  })
};

export const registerSchema: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required()
  })
};
