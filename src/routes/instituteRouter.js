const express = require('express');
const routerInstutite = express.Router();
const validate = require('../middleware/validateinput');
const validateInstute = require("../helper/validateInstute")
const instituteController = require('../controllers/instutiteController');

routerInstutite.post('/create', instituteController.createInstitution);
routerInstutite.get('/getAll', instituteController.getInstitutes);
routerInstutite.get('/get/:uuid', instituteController.getInstituteById);
routerInstutite.delete('/delete/:uuid', instituteController.deleteInstitute);

module.exports = routerInstutite;