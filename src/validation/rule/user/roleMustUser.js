export default async (value, { req }) => {
  if (req.AuthUser.role === 'admin' && req.userFinded.role === 'super-admin') {
    return Promise.reject();
  }
  return true;
};
