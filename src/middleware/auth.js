import models from '../models';
import { decode } from '../helpers/jwt';
import * as response from '../helpers/responseApi';

const { User } = models;

const auth = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization);
    if (!req.headers.authorization) {
      throw new RangeError('401-Unauthorized');
    }
    const userEncode = decode(token.replace(/Bearer /, ''));

    const dataUser = await User.findOne({
      where: {
        name: userEncode.name,
      },
    });
    if (!dataUser) {
      throw new RangeError('401-Unauthorized');
    }
    delete dataUser.get().password;
    req.AuthUser = dataUser;
    return next();
  } catch (error) {
    return response.Error(res, error);
  }
};

const guest = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) throw new RangeError('403-session still active');
    return next();
  } catch (error) {
    return response.Error(res, error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.AuthUser.role.includes('admin')) {
      throw new RangeError('403-Forbidden');
    }
    return next();
  } catch (error) {
    return response.Error(res, error);
  }
};

export { auth, guest, isAdmin };
