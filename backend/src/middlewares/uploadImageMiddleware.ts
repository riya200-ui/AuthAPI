import { Request, Response, NextFunction } from 'express';
import { removeTemp } from '../utils/removeTemp';
import fileUpload from 'express-fileupload';

export const uploadImageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ message: 'no files were uploaded to the server' });
    }

    const file = req.files?.file as fileUpload.UploadedFile;

    if (file?.size > 4000) {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ message: 'size of the file is too large' });
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ message: 'file format is not supported' });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
