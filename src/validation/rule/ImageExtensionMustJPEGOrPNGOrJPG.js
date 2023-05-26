export default (value, { req }) => {
  if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg') {
    return true;
  }
  return Promise.reject();
};
