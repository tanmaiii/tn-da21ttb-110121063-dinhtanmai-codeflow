import { RequestWithFile } from '@/interfaces/auth.interface';
import { createCanvas } from 'canvas';
import { NextFunction, Request, Response } from 'express';

function getFilePath(files: { [fieldname: string]: Express.Multer.File[] }, field: string): string {
  return files?.[field]?.[0]?.filename || '';
}

export class FileController {
  public upload = async (req: RequestWithFile, res: Response, next: NextFunction) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (!files) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      const filePaths = Object.entries(files).map(([fieldname, fileArray]) => ({
        fieldname,
        files: fileArray.map(file => ({
          path: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        })),
      }));

      return res.status(200).json({
        data: filePaths[0],
        message: 'upload',
      });
    } catch (error) {
      next(error);
    }
  };

  public avatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = req.params.name ?? 'CodeFlow';
      const firstLetter = name.charAt(0).toUpperCase();

      const width = 400;
      const height = 400;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');

      // Tạo màu nền ngẫu nhiên
      const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const hue = hash % 360;
      const saturation = 70;
      const lightness = 50;
      const randomColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.fillStyle = randomColor;
      ctx.fillRect(0, 0, width, height);

      // Vẽ chữ cái đầu
      ctx.fillStyle = '#ffffff';
      ctx.font = '200px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(firstLetter, width / 2, height / 2);

      res.setHeader('Content-Type', 'image/png');
      const buffer = canvas.toBuffer('image/png');
      res.end(buffer);
    } catch (error) {
      next(error);
    }
  };
}
