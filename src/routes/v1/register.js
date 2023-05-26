import express from 'express';
import { guest } from '../../middleware/auth';
import catcher from '../../helpers/handler';
import validate from '../../helpers/validator';
import validationRegis from '../../validation/user/register';
import * as authController from '../../controller/authController';

const route = express.Router();
route.post('/', guest, validationRegis, validate, catcher(authController.register));
export default route;
