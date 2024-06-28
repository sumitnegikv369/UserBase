import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'UserBase REST API Docs',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }
