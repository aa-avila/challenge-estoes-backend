module.exports = {
  post: {
    tags: ['PROJECTS'],
    summary: 'Actualizar un proyecto',
    operationId: 'projectUpdate',
    parameters: [
      {
        $ref: '#/components/schemas/parameters/idParam'
      }
    ],
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
        description: 'Actualización exitosa'
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
