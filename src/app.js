import dotenv from 'dotenv';
import express from 'express';
import loader from './config/loader';

process.chdir(__dirname);
dotenv.config();
function runserver() {
  const app = express();
  loader(app).catch((err) => {
    console.error(err);
    throw err;
  });
}

runserver();
