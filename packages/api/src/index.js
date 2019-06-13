/* istanbul ignore file */
import '@babel/polyfill/noConflict';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import throng from 'throng';
import getSwaggerDocWithRefs from '../documentation/prepareDoc';
import router from './routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;
const workers = process.env.WEB_CONCURRENCY || 3;
const env = process.env.NODE_ENV;

async function start() {
  const swaggerDocument = await getSwaggerDocWithRefs('./documentation/index.yaml');

  app.use(cors());
  app.use(expressValidator());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api', router);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build/index.html'));
  });

  app.listen(port, () => console.log(`server running on port ${port}`));
}

switch (env) {
  case 'production':
    throng({
      workers,
      lifetime: Infinity,
      start,
    });
    break;

  default:
    start();
}

export default app;
