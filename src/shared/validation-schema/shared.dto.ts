import * as Joi from 'joi';

export const PaginationSchema = Joi.object({
  limit: Joi.number().integer().positive().default(10).max(500).required(),
  page: Joi.number().integer().positive().default(1).min(1).required(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  sortBy: Joi.string().default('createdAt'),
});
