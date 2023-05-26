import model from '../../../models';

export default async (value, { req }) => {
  const data = await model.User.findOne({ where: { id: value } });
  if (data !== null) {
    delete data.get().password;
    req.userFinded = data;
    return true;
  }
  return Promise.reject();
};
