/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import chalk from 'chalk';
import respone from './responseApi';

// const chalk = require('chalk');

const borderLength = 64;
function borderOuter() {
  console.log(chalk.hex('#5edcff')('='.repeat(borderLength)));
}
function borderInner() {
  console.log(chalk.hex('#5edcff')('-'.repeat(borderLength)));
}

function PrintNicer(title, value, isTabular = true) {
  console.log(chalk.hex('#fcba03')(`> ${title}`));

  if (isTabular) console.table(value);
  else console.dir(value);

  borderInner();
}

function PrintoutError(err, req) {
  borderOuter();
  borderInner();

  PrintNicer('Endpoint', `[${req.method}] ${req.url}`, false);
  PrintNicer('Route', req.route, false);
  PrintNicer('Headers', req.headers);
  PrintNicer('Queries', req.query);
  PrintNicer('Body', req.body);

  // if (req.file || req.files) {
  //   PrintNicer('File', req.file ? req.file : req.files);
  // }

  console.log(chalk.hex('#ff4640')(err.stack));

  borderInner();
  borderOuter();
}

/**
 * Function to log when there is an error
 * @param {object} err express error
 * @param {object} req express request
 * @param {object} res express response
 * @param {function} next express next function
 */
const ErrorLog = (err, req, res) => {
  if (res.headersSent) return;

  if (process.env.NODE_ENV === 'development' && !!err) {
    PrintoutError(err, req);
  }
  SendResponse(err, req, res);
};

/**
 * Function for try catch on controller
 * @param {function} fn controller function
 */
const Catcher = (fn) => function catcher(...args) {
  return Promise.resolve(fn(...args)).catch((err) => {
    ErrorLog(err, ...args);
  });
};

/**
 * Function to send error response
 * @param {object} err express error
 * @param {object} _req express request
 * @param {object} res express response
 * @param {function} _next express function
 */
const SendResponse = (err, req, res) => {
  if (err) {
    if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
      const errs = err.errors.map((e) => ({ source: e.path, message: e.message }));
      return respone.BadRequest(res, errs);
    }
    return respone.Error(res, err);
  }

  if (req.method === 'GET') {
    res.locals.result = true;
    res.locals.message = '';
  }

  return respone.Success(res);
};

export default Catcher;
