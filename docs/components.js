module.exports = {
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header'
      }
    },
    schemas: {
      user: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'Email de usuario',
            example: 'test@admin.com'
          },
          password: {
            type: 'string',
            description: 'Clave de usuario',
            example: '12345678'
          }
        }
      },
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
          },
          projectStatusId: {
            type: 'integer',
            description: 'ID de status del proyecto.',
            example: 2
          },
          projectManagerId: {
            type: 'integer',
            description: 'ID de usuario manager del proyecto.',
            example: 1
          },
          assignees: {
            type: 'array',
            items: {
              type: 'integer'
            },
            description: 'IDs de usuarios asignados al proyecto.',
            example: [2, 3, 4]
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
