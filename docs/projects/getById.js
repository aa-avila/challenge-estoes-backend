module.exports = {
  get: {
    tags: ['PROJECTS'],
    summary: 'Obtener un proyecto.',
    operationId: 'projectGetById',
    parameters: [
      {
        $ref: '#/components/schemas/parameters/idParam'
      }
    ],
    responses: {
      200: {
        description: 'Detalle del proyecto.'
      },
      400: {
        description: 'Error'
      },
      401: {
        description: 'No autorizado'
      },
      404: {
        description: 'No se encuentra el proyecto solicitado.'
      },
      500: {
        description: 'Error del servidor.'
      }
    }
  }
};
