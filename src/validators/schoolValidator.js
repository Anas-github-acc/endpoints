const { z } = require('zod');

const coordinateSchema = z
  .coerce.number({ message: 'Must be a number' })
  .refine((value) => Number.isFinite(value), { message: 'Must be finite' });

const addSchoolSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255, 'Name is too long'),
  address: z.string().trim().min(1, 'Address is required').max(500, 'Address is too long'),
  latitude: coordinateSchema.refine((value) => value >= -90 && value <= 90, {
    message: 'Latitude must be between -90 and 90',
  }),
  longitude: coordinateSchema.refine((value) => value >= -180 && value <= 180, {
    message: 'Longitude must be between -180 and 180',
  }),
});

const listSchoolsQuerySchema = z.object({
  latitude: coordinateSchema.refine((value) => value >= -90 && value <= 90, {
    message: 'Latitude must be between -90 and 90',
  }),
  longitude: coordinateSchema.refine((value) => value >= -180 && value <= 180, {
    message: 'Longitude must be between -180 and 180',
  }),
});

module.exports = {
  addSchoolSchema,
  listSchoolsQuerySchema,
};
