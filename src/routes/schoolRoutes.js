const express = require('express');
const schoolController = require('../controllers/schoolController');
const validate = require('../middlewares/validate');
const { addSchoolSchema, listSchoolsQuerySchema } = require('../validators/schoolValidator');

const router = express.Router();

router.post('/addSchool', validate(addSchoolSchema, 'body'), schoolController.addSchool);
router.get('/listSchools', validate(listSchoolsQuerySchema, 'query'), schoolController.listSchools);

module.exports = router;
