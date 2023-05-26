/* eslint-disable import/no-import-module-exports */
import models from '../models';
import * as response from '../helpers/responseApi';
import convertReqQueryToLikeQuery from '../helpers/query';

const { User } = models;

const index = async (req, res) => {
  const data = await User.findAll({ where: { ...convertReqQueryToLikeQuery(req.query, { enum: ['role'] }) }, attributes: ['id', 'role', 'name', 'updatedAt'] });
  return response.Success(res, data, 'list data users');
};

const currentUser = (req, res) => response.Success(res, req.AuthUser, 'user by login');

const updateProfile = async (req, res) => {
  const payload = { ...req.body };
  delete payload.password_confirm;

  const data = await req.AuthUser.update(payload);
  return response.Success(res, data, 'update profile successfully, you must loggin again');
};

const editRole = async (req, res) => {
  const datas = await req.userFinded.update({ role: req.body.role });
  return response.Success(res, datas, 'updated role successfully');
};

const deleteUser = async (req, res) => {
  const datas = await req.userFinded.destroy();
  return response.Success(res, datas, 'user delete successfully');
};
export {
  index, currentUser, updateProfile, editRole, deleteUser,
};
