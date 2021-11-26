module.exports = {
  post: {
    tags: ['AUTH'],
    summary: 'Login de usuario.',
    description:
      'Acceder mediante usuario (email) y contraseña (password). Devuelve un objeto con token de sesion.',
    operationId: 'authLogin',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/user'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Login correcto'
      },
      400: {
        description: 'Error de login'
      },
      500: {
        description: 'Server error'
      }
    }
  }
};
