import express from 'express';
import { guest } from '../../middleware/auth';
import catcher from '../../helpers/handler';
import validate from '../../helpers/validator';
import Validationlogin from '../../validation/user/login';
import * as authController from '../../controller/authController';

const route = express.Router();
route.post('/', guest, Validationlogin, validate, catcher(authController.login));
export default route;
