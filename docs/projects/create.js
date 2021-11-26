module.exports = {
  post: {
    tags: ['PROJECTS'],
    summary: 'Crear un proyecto',
    operationId: 'projectCreate',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/project'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Creación exitosa'
      },
      400: {
        description: 'Error'
      },
      401: {
        description: 'No autorizado'
      },
      500: {
        description: 'Error del servidor'
      }
    }
  }
};
