/* eslint-disable max-len */
import express from 'express';
import userRoute from './v1/user';
import regisRoute from './v1/register';
import loginRoute from './v1/login';

const app = express();
// about auth
app.use('/register', regisRoute);
app.use('/login', loginRoute);
// about user
app.use('/user', userRoute);
export default app;
