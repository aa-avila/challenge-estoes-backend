module.exports = {
  get: {
    tags: ['PROJECTS'],
    summary: 'Obtener un conjunto de proyectos.',
    description:
      'Los parámetros "page" y "limit" son requeridos para la paginación. También es posible la búsqueda por nombre mediante el parámetro "name", el cual es opcional y además puede no ser un nombre completo.',
    operationId: 'projectsGetAll',
    parameters: [
      {
        name: 'page',
        in: 'query',
        description: 'Número de página',
        schema: {
          type: 'integer',
          example: 1
        }
      },
      {
        name: 'limit',
        in: 'query',
        description: 'Límite de resultados por página.',
        schema: {
          type: 'integer',
          example: 10
        }
      },
      {
        name: 'name',
        in: 'query',
        description: 'Nombre del proyecto a buscar (opcional).',
        schema: {
          type: 'string',
          example: 'land'
        }
      }
    ],
    responses: {
      200: {
        description:
          'Todos los proyectos que coinciden con los parámetros de la petición.'
      },
      400: {
        description: 'Error en los parámetros de la petición.'
      },
      401: {
        description: 'Error de autenticación.'
      },
      500: {
        description: 'Error del servidor.'
      }
    }
  }
};
