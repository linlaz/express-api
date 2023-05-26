import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import route from '../routes';
import winston from './logging';

export default async function configApp(app) {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  morgan.token('req-body', (req) => JSON.stringify(req.body));
  app.use(morgan(':remote-user [:date[clf]] ":method :url" :status :res[content-length] :req-body ":referrer" ":user-agent"', {
    skip(req, res) { return res.statusCode < 400; },
    stream: winston.err,
  }));
  app.use(morgan(':status :method :url :res[content-length] - :response-time ms', {
    skip(req, res) { return res.statusCode > 400; },
    stream: winston.inf,
  }));
  // app.use((err, req, res, next) => {
  //   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
  //     return res.status(400).send({ status: 404, message: err.message });
  //   }
  //   return next();
  // });
  app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
  app.use('/api/v1', route);
}
