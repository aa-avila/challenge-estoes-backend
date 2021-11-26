const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const basicInfo = require('./basicInfo');
const tags = require('./tags');
const paths = require('./paths');
const components = require('./components');

const swaggerDefinition = {
  ...basicInfo,
  ...components,
  security: [
    {
      ApiKeyAuth: []
    }
  ],
  ...tags,
  ...paths
};

const options = {
  swaggerDefinition,
  apis: ['../routes*.js']
};

const swaggerSpec = swaggerJsDoc(options);

// console.log(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
