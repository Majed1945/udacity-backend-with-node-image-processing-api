import { Request, Response } from 'express';
import { processImage } from '../services/imageService';

export const resizeImage = async (req: Request, res: Response) => {
  const { fileName, height, width } = req.query;
  try {
    const { buffer, format } = await processImage(
      fileName as string,
      parseInt(width as string),
      parseInt(height as string)
    );
    const contentType = `image/${format}`;
    res.set('Content-Type', contentType);
    res.send(buffer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unexpected error occurred');
    }
  }
};
