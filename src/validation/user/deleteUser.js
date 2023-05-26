import { body } from 'express-validator';
import roleMustUser from '../rule/user/roleMustUser';

const deleteUser = [
  body().custom(roleMustUser).withMessage('Forbidden'),
];
export default deleteUser;
