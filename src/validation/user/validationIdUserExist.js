import { param } from 'express-validator';
import userByIdMustExists from '../rule/user/userByIdMustExists';

const validationIdUserExist = [
  param('id').exists({ checkNull: true })
    .withMessage('Missing parameter')
    .bail()
    .custom(userByIdMustExists)
    .withMessage('User not Found'),
];

export default validationIdUserExist;
