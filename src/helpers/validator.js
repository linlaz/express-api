import { validationResult } from 'express-validator';
import * as response from './responseApi';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let forbidden = true;
    const extractedErrors = [];
    const data = errors.array().some((err) => {
      if (err.msg.includes('Found')) {
        extractedErrors.message = err.msg;
        forbidden = false;
        return true;
      }
      if (err.msg.includes('Forbidden')) {
        extractedErrors.message = err.msg;
        return true;
      }
      if (err.nestedErrors === undefined) {
        if (err.param) {
          extractedErrors.push({
            source: err.param.replace('_', ' '),
            message: err.msg,
          });
        } else {
          const errData = err.msg.split('-');
          extractedErrors.push({
            source: errData[0].replace('_', ' '),
            message: errData[1],
          });
        }
      } else {
        err.nestedErrors.map((errChild) => extractedErrors.push({
          source: errChild.param.replace('_', ' '),
          message: errChild.msg,
        }));
      }
      return false;
    });
    if (data) {
      if (forbidden) {
        const rangeErr = new RangeError('403-forbidden');
        return response.Error(res, rangeErr);
      }
      const rangeErr = new RangeError(`404-${extractedErrors.message}`);
      return response.Error(res, rangeErr);
    }
    return response.BadRequest(res, extractedErrors);
  }
  return next();
};

export default validate;
