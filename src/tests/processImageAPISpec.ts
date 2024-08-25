import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Image Processing API Endpoint Tests', () => {
  it('should return 200 when all params are provided and image file exists', async () => {
    const response = await request.get(
      '/api/images/resize?fileName=mountain&width=1000&height=1000'
    );
    expect(response.status).toBe(200);
  });

  it('should return 400 if fileName is missing', async () => {
    const response = await request.get(
      '/api/images/resize?width=1000&height=1000'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      'Filename is required and must be a valid alphanumeric string with hyphens or underscores allowed.'
    );
  });

  it('should return 400 if fileName is invalid', async () => {
    const response = await request.get(
      '/api/images/resize?fileName=mountain@!&width=1000&height=1000'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      'Filename is required and must be a valid alphanumeric string with hyphens or underscores allowed.'
    );
  });

  it('should return 400 if height is missing', async () => {
    const response = await request.get(
      '/api/images/resize?fileName=mountain&width=1000'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('Height and width must be valid numbers.');
  });

  it('should return 400 if height is not a number', async () => {
    const response = await request.get(
      '/api/images/resize?fileName=mountain&width=1000&height=abc'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('Height and width must be valid numbers.');
  });

  it('should return 500 if image file does not exist', async () => {
    const response = await request.get(
      '/api/images/resize?fileName=nonexistent&width=1000&height=1000'
    );
    expect(response.status).toBe(500);
    expect(response.text).toBe(
      'Image file not found or unsupported format: nonexistent'
    );
  });
});
