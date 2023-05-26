import express from 'express';
import { auth, isAdmin } from '../../middleware/auth';
import catcher from '../../helpers/handler';
import validate from '../../helpers/validator';
import * as userController from '../../controller/userController';
import validationProfile from '../../validation/user/updateProfile';
import validationIdUserExist from '../../validation/user/validationIdUserExist';
import updateRole from '../../validation/user/updateRole';
import deleteUser from '../../validation/user/deleteUser';

const route = express.Router();

route.get('/', auth, isAdmin, catcher(userController.index));
route.get('/profile', auth, catcher(userController.currentUser));
route.put('/profile', auth, validationProfile, validate, catcher(userController.updateProfile));
route.put('/role/:id', auth, isAdmin, validationIdUserExist, updateRole, validate, catcher(userController.editRole));
route.delete('/:id', auth, isAdmin, validationIdUserExist, deleteUser, validate, catcher(userController.deleteUser));

export default route;
