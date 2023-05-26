/* eslint-disable brace-style */
import {
  existsSync, mkdirSync, writeFileSync, rmSync,
} from 'fs';
import { join } from 'path';

const uploadPath = join(__dirname, '../../uploads');

/**
 * Helper function to upload file
 * @param {object} file file to upload
 * @param {string} entityPath the path to place the uploaded file
 * @param {string} fileName custom file name
 */
export function upload(file, entityPath, fileName) {
  // create path uploadPath
  if (!existsSync(uploadPath)) mkdirSync(uploadPath);

  // create path entityPath
  const dir = join(uploadPath, entityPath);
  if (!existsSync(dir)) mkdirSync(dir);

  let fileNameWithExtension;
  if (fileName) {
    fileNameWithExtension = fileName
      + file.originalname.substring(file.originalname.lastIndexOf('.'));
  } else {
    fileNameWithExtension = file.originalname;
  }

  writeFileSync(`${dir}/${fileNameWithExtension}`, file.buffer);
  return `${dir}/${fileNameWithExtension}`;
}

/**
 * Fungsi bantuan untuk menghapus folder
 * @param {string} path path yang folder yang akan dihapus
 */
export function deleteFolder(dir) {
  // create path uploadPath
  if (existsSync(dir)) rmSync(dir, { recursive: true });
}

/**
 * Fungsi bantuan untuk mendapatkan path folder
 * @param {string} entityPath path yang akan ditempatkan file unggahan
 */
export function getFolderPath(entityPath) // create path entityPath
{ return join(uploadPath, entityPath); }

/**
 * Helper function to upload array buffer file
 * @param {object} file buffer file to upload
 * @param {string} entityPath the path to place the uploaded file
 * @param {string} fileName custom file name
 */
export function uploadArrayBuffer(file, entityPath, fileName) {
  // create path uploadPath
  if (!existsSync(uploadPath)) mkdirSync(uploadPath);

  // create path entityPath
  const dir = join(uploadPath, entityPath);
  if (!existsSync(dir)) mkdirSync(dir);

  writeFileSync(`${dir}/${fileName}`, file);
  return `${dir}/${fileName}`;
}
