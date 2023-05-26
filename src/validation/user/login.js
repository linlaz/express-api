import { body } from 'express-validator';
import userByNameMustExists from '../rule/user/userByNameMustExists';
import validatePassword from '../rule/user/validatePassword';

const login = [
  body('name').exists({ checkNull: true }).withMessage('Not Null').bail()
    .isLength({ min: 2 })
    .withMessage('min 2 charater')
    .bail()
    .isAlphanumeric()
    .withMessage('must alphabet and numeric only')
    .bail()
    .custom(userByNameMustExists)
    .withMessage('Not Found'),
  body('password').exists({ checkNull: true }).withMessage('Not Null').bail()
    .isLength({ min: 8 })
    .withMessage('min 8 charachter')
    .bail()
    .isString('Must String')
    .custom(validatePassword)
    .withMessage('Name or Password is wrong'),
];

export default login;
