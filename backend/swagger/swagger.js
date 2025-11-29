const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "API for managing contacts and tasks",
    },
    servers: [
      {
        url: "https://cse341-node-zndx.onrender.com",
      },
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      schemas: {
        Contact: {
          type: "object",
          required: ["firstName", "lastName", "email", "favoriteColor"],
          properties: {
            firstName: {
              type: "string",
              example: "Adams",
            },
            lastName: {
              type: "string",
              example: "Oyama",
            },
            email: {
              type: "string",
              example: "adamsoyama@gmail.com",
            },
            favoriteColor: {
              type: "string",
              example: "Blue",
            },
            birthday: {
              type: "string",
              format: "date",
              example: "1995-06-15",
            },
          },
        },
        Task: {
          type: "object",
          required: ["title", "description", "dueDate"],
          properties: {
            title: {
              type: "string",
              example: "Finish Swagger setup",
            },
            description: {
              type: "string",
              example: "Add annotations and schemas for all routes",
            },
            dueDate: {
              type: "string",
              format: "date",
              example: "2025-11-30",
            },
            completed: {
              type: "boolean",
              example: false,
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Scan all route files for Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
