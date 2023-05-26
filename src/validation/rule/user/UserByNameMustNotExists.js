import model from '../../../models';

export default async (value) => {
  const data = await model.User.findOne({ where: { name: value } });
  if (data) {
    return Promise.reject();
  }
  return true;
};
