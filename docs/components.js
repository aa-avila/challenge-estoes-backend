module.exports = {
  components: {
    // securitySchemes: {
    //     bearerAuth: {
    //         "type": "http",
    //         "scheme": "bearer",
    //         "bearerFormat": "JWT",
    //     },
    // },
    schemas: {
      // user: {
      //     type: 'object',
      //     properties: {
      //         email: {
      //             type: 'string',
      //             description: "Email de usuario",
      //             example: "user@server.com"
      //         },
      //         password: {
      //             type: 'string',
      //             description: "Clave de usuario",
      //             example: "hDoej34Use"
      //         }
      //     }
      // },
      project: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nombre del proyecto.',
            example: 'Landing Page'
          },
          description: {
            type: 'string',
            description: 'Descripción del proyecto.',
            example: 'Elaboración de landing page.'
          }
        }
      },
      parameters: {
        idParam: {
          name: 'id',
          in: 'path',
          description: 'ID único de identificación del elemento en la BD.',
          schema: {
            type: 'integer',
            example: 32
          }
        }
      }
    }
  }
};
