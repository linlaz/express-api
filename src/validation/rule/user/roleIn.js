export default (value) => {
  const enums = ['super-admin', 'admin', 'user'];
  return enums.includes(value);
};
