import multer, { diskStorage } from "multer";
import { AppError } from "../../pkg/error/error.js";

const storage = multer.diskStorage({});

function multerUpload() {
  return multer({
    storage: diskStorage({}),
  });
}

export function uploadSingle(fieldName) {
  return multerUpload().single(fieldName);
}

export function uploadArray(fieldName, maxCount = 10) {
  return multerUpload().array(fieldName, maxCount);
}

export function uploadFields(fieldsConfig) {
  return multerUpload().fields(fieldsConfig);
}
