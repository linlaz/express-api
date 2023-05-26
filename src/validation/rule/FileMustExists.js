export default async (value, { req }) => {
  if (req.file !== undefined) {
    return true;
  }
  return Promise.reject();
};
