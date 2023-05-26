import model from '../../../models';

export default async (value, { req }) => {
  const data = await model.User.findOne({ where: { name: value } });
  if (data !== null) {
    req.preLog = data;
    return true;
  }
  return Promise.reject();
};
