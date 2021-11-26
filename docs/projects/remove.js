module.exports = {
  delete: {
    tags: ['PROJECTS'],
    summary: 'Eliminar un proyecto.',
    operationId: 'projectRemove',
    parameters: [
      {
        $ref: '#/components/schemas/parameters/idParam'
      }
    ],
    responses: {
      200: {
        description: 'Proyecto eliminado correctamente.'
      },
      400: {
        description: 'Error'
      },
      401: {
        description: 'Error de autenticación.'
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
