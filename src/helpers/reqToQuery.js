/* eslint-disable max-len */
import slugify from '../utils/slugable';
import { upload } from './file';

export default function queryUpdate(req, fileField) {
  const request = req.body;
  const payload = {};
  Object.keys(request).forEach((key) => {
    if (request[key].length >= 1) {
      payload[key] = request[key];
    }
    if (req.file) {
      const name = req.file.originalname.split('.');
      const image = upload(req.file, fileField.loc, `${new Date().getTime()}-${slugify(name[0])}`);
      payload[fileField.files] = image.slice(image.indexOf('/uploads'));
    }
  });
  return payload;
}
