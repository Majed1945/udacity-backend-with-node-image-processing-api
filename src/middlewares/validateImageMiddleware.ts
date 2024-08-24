import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const validateImageMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fileName, height, width } = req.query;

  // Check if fileName is provided and valid
  if (
    !fileName ||
    typeof fileName !== 'string' ||
    !validator.isAlphanumeric(fileName, 'en-US', { ignore: '-_' })
  ) {
    return res
      .status(400)
      .send(
        'Filename is required and must be a valid alphanumeric string with hyphens or underscores allowed.'
      );
  }

  // Check if height and width are numbers and integers
  const heightNum = Number(height);
  const widthNum = Number(width);

  if (isNaN(heightNum) || isNaN(widthNum)) {
    return res.status(400).send('Height and width must be valid numbers.');
  }

  if (!Number.isInteger(heightNum) || !Number.isInteger(widthNum)) {
    return res
      .status(400)
      .send('Height and width must be whole numbers without decimals.');
  }

  // Ensure height and width are positive
  if (heightNum <= 0 || widthNum <= 0) {
    return res.status(400).send('Height and width must be positive integers.');
  }

  // If all checks pass, proceed to the next middleware or route handler
  next();
};
