import bcrypt from 'bcrypt';

export default async (value, { req }) => {
  const checkPassword = await bcrypt.compare(value, req.preLog.get().password);
  if (checkPassword) {
    delete req.preLog.get().password;
    return true;
  }
  delete req.preLog;
  return Promise.reject();
};
