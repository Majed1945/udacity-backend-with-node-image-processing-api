import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export const processImage = async (
  fileName: string,
  width: number,
  height: number
): Promise<{ buffer: Buffer; format: string }> => {
  // Define the list of valid image formats supported
  const validImageFormats = [
    'jpeg',
    'png',
    'webp',
    'gif',
    'avif',
    'tiff',
    'svg',
  ] as const;

  // Build the base file path without extension
  const baseFilePath = path.resolve(__dirname, '../assets/full', fileName);
  let detectedFormat: string | undefined;

  // Check for the existence of the image file in each valid format
  for (const format of validImageFormats) {
    const filePathWithExtension = `${baseFilePath}.${format}`;
    if (fs.existsSync(filePathWithExtension)) {
      detectedFormat = format;
      break;
    }
  }

  // If no valid image format is found, throw an error
  if (!detectedFormat) {
    throw new Error(`Image file not found or unsupported format: ${fileName}`);
  }

  // Construct the full file path with the detected format
  const filePathWithExtension = `${baseFilePath}.${detectedFormat}`;
  // Define the directory and file path for the resized image (thumbnail)
  const thumbDir = path.resolve(__dirname, '../assets/thumb');
  const thumbFileName = `${fileName}_${width}x${height}.${detectedFormat}`;
  const thumbFilePath = path.join(thumbDir, thumbFileName);

  // If the resized image already exists, return it from the thumbnail directory
  if (fs.existsSync(thumbFilePath)) {
    return {
      buffer: await fs.promises.readFile(thumbFilePath),
      format: detectedFormat,
    };
  }

  try {
    // Initialize sharp with the original image file
    const image = sharp(filePathWithExtension);
    // Resize the image and convert it to a buffer
    const resizedImageBuffer = await image.resize(width, height).toBuffer();

    // Ensure the thumbnail directory exists
    if (!fs.existsSync(thumbDir)) {
      fs.mkdirSync(thumbDir, { recursive: true });
    }

    // Save the resized image to the thumbnail directory
    await fs.promises.writeFile(thumbFilePath, resizedImageBuffer);

    // Return the resized image buffer and format
    return {
      buffer: resizedImageBuffer,
      format: detectedFormat,
    };
  } catch (error) {
    // Handle and throw errors during image processing
    if (error instanceof Error) {
      throw new Error(`Failed to process the image: ${error.message}`);
    } else {
      throw new Error('Failed to process the image: unknown error');
    }
  }
};
