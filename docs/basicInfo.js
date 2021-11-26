const customPort = process.env.CUSTOM_PORT;
const PORT = process.env.PORT || customPort;

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Esto Es - Challenge Backend',
    version: '1.0.0',
    description:
      'API desarrollada para la realización del Challenge Backend de "Esto Es Agencia Digital".',
    contact: {
      name: 'Agustín Avila Humerez',
      email: 'agustin.avila.dev@gmail.com',
      url: 'https://github.com/aa-avila/challenge-estoes-backend'
    }
  },
  servers: [
    {
      url: 'https://esto-es-challenge-back.herokuapp.com/',
      description: 'Heroku Server'
    },
    {
      url: `http://localhost:${PORT}`,
      description: 'Local development server'
    }
  ]
};
