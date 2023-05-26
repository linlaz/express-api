import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../../swagger.json';
import environment from './environment';

export default (app) => {
  let url = `${environment[process.env.NODE_ENV].appUrl}`;
  if (process.env.NODE_ENV === 'development') {
    url = url.concat(`:${environment[process.env.NODE_ENV].appPort}`);
  }
  swaggerConfig.definition.servers = [{ url }];
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerConfig)));
};
