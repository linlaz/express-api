/* eslint-disable no-unused-vars */
import { body } from 'express-validator';
import models from '../../models';
import passwordNotMatch from '../rule/user/passwordNotMatch';
import UserByNameMustNotExists from '../rule/user/UserByNameMustNotExists';

const { User } = models;

const validationProfile = [
  body('name').optional().exists({ checkFalsy: true, checkNull: true }).withMessage('Not Null')
    .bail()
    .isLength({ min: 2 })
    .withMessage('min 2 charater')
    .bail()
    .isAlphanumeric()
    .withMessage('must alphabet and numeric only')
    .bail()
    .custom(UserByNameMustNotExists)
    .withMessage('already exists'),
  body('password').optional().exists({ checkFalsy: true, checkNull: true }).withMessage('Not Null')
    .bail()
    .isLength({ min: 8 })
    .withMessage('min 8 charachter')
    .bail()
    .isString('Must String')
    .bail()
    .matches(/(?=.*\d)/)
    .withMessage('Must Contains Number')
    .bail()
    .matches(/(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage('Must Contains Upper Case And Lower Case Character'),
  body('password_confirm').if(body('password').exists({ checkFalsy: true, checkNull: true })).exists({ checkFalsy: true, checkNull: true }).withMessage('Confirm Not null')
    .bail()
    .custom(passwordNotMatch)
    .withMessage('not match'),
];

export default validationProfile;
