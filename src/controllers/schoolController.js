const schoolService = require('../services/schoolService');

async function addSchool(req, res, next) {
  try {
    const school = await schoolService.createSchool(req.body);

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: school,
    });
  } catch (error) {
    return next(error);
  }
}

async function listSchools(req, res, next) {
  try {
    const { latitude, longitude } = req.query;
    const schools = await schoolService.getSchoolsSortedByDistance(latitude, longitude);

    return res.status(200).json({
      success: true,
      message: 'Schools fetched successfully',
      data: schools,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addSchool,
  listSchools,
};
