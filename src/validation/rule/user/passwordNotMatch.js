export default (value, { req }) => {
  if (value !== req.body.password) {
    return Promise.reject();
  }
  return true;
};
