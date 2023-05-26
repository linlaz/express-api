/* eslint-disable max-len */
import model from '../models';
import * as response from '../helpers/responseApi';
import { encode } from '../helpers/jwt';

const { User } = model;

const register = async (req, res) => {
  const data = { ...req.body };
  const dataUser = await User.create({
    ...data,
  });
  const datas = {
    user: dataUser,
    token: encode(dataUser),
  };
  return response.Success(res, datas, 'register success');
};

const login = async (req, res) => {
  const datas = {
    user: req.preLog,
    token: encode(req.preLog),
  };

  return response.Success(res, datas, 'login success');
};

export { register, login };
