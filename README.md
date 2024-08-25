# Image Processing API

## Project Description

The Image Processing API is a Node.js application designed to handle image processing tasks such as resizing and format conversion. Built using Node.js, Express, and TypeScript, the API provides endpoints for processing images, including resizing images and returning them in various formats. The application is designed for scalability and robustness, featuring middleware for error handling and logging, and is equipped with unit tests to ensure functionality and code quality.

The API adheres to industry best practices for code quality, including linting, formatting, and thorough testing. The focus is on delivering a reliable service with well-defined error handling, logging, and documentation for ease of use and maintenance.

## How to Run the Project

To run the project, follow these steps:

1. **Ensure Prerequisites:**

   - Ensure you have Node.js and npm installed on your machine.
   - Ensure you have TypeScript and the necessary development tools.

2. **Clone the Repository:**

   - Clone the project repository to your local machine using:
     ```bash
     git clone https://github.com/Majed1945/udacity-backend-with-node-image-processing-api.git
     ```

3. **Navigate to Project Directory:**

   - Open your terminal and navigate to the project directory:
     ```bash
     cd udacity-backend-with-node-image-processing-api
     ```

4. **Install Dependencies:**

   - Install the project dependencies using:
     ```bash
     npm install
     # or
     yarn install
     ```

5. **Build the Project:**

   - Compile the TypeScript code to JavaScript using:
     ```bash
     npm run build
     ```

6. **Start the Server:**

   - Start the server by running:
     ```bash
     npm start
     ```

7. **Access the API:**

   - The server will be running on `http://localhost:3000` (or the port specified in your configuration).
   - Use tools like Postman or curl to test the API endpoints. You may test it using the browser directly.

## API Endpoints

- **Endpoint: `/api/images/resize`**

  - **Method:** `GET`
  - **Description:** Resizes an image and returns it in the requested format.
  - **Query Parameters:**
    - `fileName` (string): The name of the image file to process.
    - `width` (number): The desired width of the resized image.
    - `height` (number): The desired height of the resized image.
  - **Response:**

    - **Success:** Returns the resized image buffer in the requested format.
    - **Error:** Returns an error message if the image processing fails.

  - **Sample Request:**

    ```plaintext
    http://localhost:3000/api/images/resize?fileName=mountain&width=1000&height=1000
    ```

    This request resizes the image named `mountain` to a width of 1000 pixels and a height of 1000 pixels.

  - **Notes:**
    - A sample image named `mountain` is provided in the `assets/full` directory for testing.
    - To test other images, you need to place them in the `assets/full` directory. Ensure the images have supported formats and are named appropriately.

## Middleware

- **Logging Middleware (`loggerMiddleware.ts`):** Logs incoming requests and responses for debugging and monitoring.
- **Validation Middleware (`validateImageMiddleware.ts`):** Validates query parameters for image processing requests to ensure they meet required constraints.

## Error Handling

- The API uses middleware to handle common error scenarios, including missing files, invalid input, and server errors. Errors are returned with appropriate status codes and messages.

## Running Tests

To run tests for the project, use the following command:

```bash
npm run test
```
