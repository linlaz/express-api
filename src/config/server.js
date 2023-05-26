import environment from './environment';

export default async function server(app) {
  const port = environment[process.env.NODE_ENV].appPort || '3002';
  const host = environment[process.env.NODE_ENV].appUrl || '127.0.0.1';
  await app.listen(port, () => {
    console.info(`Servers started in port ${host}:${port}`);
  });
}
