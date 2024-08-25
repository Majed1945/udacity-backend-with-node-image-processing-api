import fs from 'fs';
import path from 'path';
import { processImage } from '../services/imageService';

describe('Image Service Tests', () => {
  it('should process and return the image buffer and format with valid inputs when file exists', async () => {
    const { buffer, format } = await processImage('mountain', 1000, 1000);
    expect(buffer).toEqual(jasmine.any(Buffer));
    expect(format).toMatch(/(jpeg|png|webp|gif|avif|tiff|svg)/);
  });

  it('should save resized image to thumbnail directory and return it', async () => {
    const fileName = 'mountain';
    const width = 500;
    const height = 500;
    const thumbDir = path.resolve(__dirname, '../assets/thumb');
    const thumbFileName = `${fileName}_${width}x${height}.jpeg`; // assuming jpeg format for test
    const thumbFilePath = path.join(thumbDir, thumbFileName);

    // Clean up any existing files from previous tests
    if (fs.existsSync(thumbFilePath)) {
      fs.unlinkSync(thumbFilePath);
    }

    // Process the image
    const { format } = await processImage(fileName, width, height);

    // Verify the file was saved and has the correct format
    expect(fs.existsSync(thumbFilePath)).toBe(true);
    expect(format).toBe('jpeg'); // Change this based on the format you use for the test

    // Clean up the generated file
    fs.unlinkSync(thumbFilePath);
  });
});
