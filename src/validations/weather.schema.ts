import { Segments, Joi, SchemaOptions } from 'celebrate';

export const addressSchema: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    street: Joi.string().trim().required(),
    streetNumber: Joi.string().trim().required(),
    town: Joi.string().trim().required(),
    postalCode: Joi.string().trim().required(),
    country: Joi.string().trim().required()
  })
};
