import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/';
    if (file.fieldname === 'image') {
      folder += 'images/';
    } else if (file.fieldname === 'files') {
      folder += 'files/';
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
    cb(null, `${Date.now()}_${sanitizedFilename}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Limit file size to 5MB

const UploadMiddleware = upload.fields([
  { name: 'image', maxCount: 10 },
  { name: 'files', maxCount: 10 }, // Allow up to 10 files
]);

// Export storage to ensure it is used
export default UploadMiddleware;
