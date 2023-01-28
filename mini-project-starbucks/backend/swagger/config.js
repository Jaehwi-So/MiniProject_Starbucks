//swaggerJSDoc Option
export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: '스타벅스 미니 프로젝트',
        version: '1.0.0',
      },
    },
    apis: ['./swagger/*.swagger.js'], // files containing annotations as above
};