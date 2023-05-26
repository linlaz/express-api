/**
 * General function to send response
 * @param {object} res response object from express js
 * @param {integer} status http status code
 * @param {any} content content to be sent to the client
 * @param {string} message to be sent to the client
 */
const Handler = (res, status, content = {}, message = '') => {
  const object = { };
  switch (parseInt(String(status).charAt(0), 10)) {
    case 2:
      object.success = true;
      object.code = status;
      break;
    case 4:
      object.success = false;
      object.code = status;
      break;
    case 5:
      object.success = false;
      object.code = status;
      break;
    default:
      object.success = false;
      object.code = status;
      break;
  }
  if (message) object.message = message;
  return res.status(status).json({ ...object, ...content });
};

/**
 * [Private function] Response when the request does not match what was requested
 * @param {object} res response object from express js
 * @param {error} err error object that is thrown by the program
 */
const BadRequest = (res, err) => Handler(res, 400, null, err.message);

/**
 * [Private] Response when access unauthorized
 * @param {object} res response object from express js
 * @param {string} message error object that is thrown by the program
 */
const Unauthorized = (res, message) => Handler(res, 401, null, message);

/**
 * [Private] Response when access prohibited
 * @param {object} res response object from express js
 * @param {string} message error object that is thrown by the program
 */
const Forbidden = (res, message) => Handler(res, 403, null, message);

/**
 * [Private] Response when the resource is not found
 * @param {object} res response object from express js
 * @param {me} err error object that is thrown by the program
 */
const NotFound = (res, err) => Handler(res, 404, null, err.message);

/**
 * [Private] Response when the server encounters an error
 * @param {object} res response object from express js
 * @param {error} err error object that is thrown by the program
 */
const ServerError = (res, err) => Handler(res, 500, null, err.message);

/**
 * Response range error
 * @param {object} res response object from express js
 * @param {error} err error object that is thrown by the program
 */
const RangeErrorResponse = (res, err) => {
  const errData = err.message.split('-');
  if (errData[0] === '401') {
    return Unauthorized(res, errData[1]);
  }
  if (errData[0] === '400') {
    const errors = {
      message: errData[1] ?? 'Invalid Request',
    };
    return BadRequest(res, errors);
  }
  if (errData[0] === '404') {
    const errors = {
      message: errData[1] ?? 'Data Not Found',
    };
    return NotFound(res, errors);
  }
  if (errData[0] === '403') {
    return Forbidden(res, errData[1]);
  }
  return ServerError(res, errData[1]);
};

/**
 * Response general error
 * @param {object} res response object from express js
 * @param {error} err error object that is thrown by the program
 */
exports.Error = (res, err) => {
  switch (true) {
    case err instanceof TypeError:
      return BadRequest(res, err);

    case err instanceof ReferenceError:
      return NotFound(res, err);

    case err instanceof RangeError:
      return RangeErrorResponse(res, err);

    default:
      return ServerError(res, err);
  }
};

/**
 * Response when success
 * @param {object} res response object from express js
 * @param {error} err error object that is thrown by the program
 */
exports.Success = (res, content, msg) => {
  const data = { };
  if (content) {
    data.data = content;
  }
  const message = res.locals.message || msg;
  return Handler(res, 200, data, message);
};

/**
 * Response when the request does not match what was requested (used by validator)
 * @param {object} res response object from express js
 * @param {object} content error object that is thrown by the program
 */
exports.BadRequest = (res, content) => {
  const data = {
    errors: content,
  };
  return Handler(res, 400, data);
};
