import { body } from 'express-validator';
import roleIn from '../rule/user/roleIn';
import roleMustUser from '../rule/user/roleMustUser';

const updateRole = [
  body('role').exists({ checkNull: true }).withMessage('not null').bail()
    .custom(roleIn)
    .withMessage('format role only super-admin, admin, or user ')
    .bail(),
  body().custom(roleMustUser).withMessage('Forbidden'),
];
export default updateRole;
