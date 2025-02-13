import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [{ url: "https://13.60.154.39:5000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // This tells Swagger to expect a JWT token
        },
      },
    },
    security: [{ bearerAuth: [] }], // Apply security globally (optional)
  },
  apis: [path.join(__dirname, "../routes/*.js")], // Ensure this path matches your structure
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
