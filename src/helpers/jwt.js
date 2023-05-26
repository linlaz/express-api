import { sign, verify } from 'jsonwebtoken';

export const encode = (datas) => sign({
  name: datas.name,
  role: datas.role,
}, process.env.JWT_SECRET_CODE);

export const decode = (datas) => {
  try {
    const dec = verify(datas, process.env.JWT_SECRET_CODE);
    return dec;
  } catch (error) {
    throw new RangeError(`401-${error.message ?? 'Unauthorized'}`);
  }
};
