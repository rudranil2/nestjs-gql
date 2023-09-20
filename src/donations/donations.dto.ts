import * as Joi from 'joi';

export const CreateDonationSchema = Joi.object({
  count: Joi.number().positive().required(),
  displayName: Joi.string().required(),
  email: Joi.string().trim().email().required(),
  mobile: Joi.string().min(10).max(10),
});
