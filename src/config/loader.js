import sequilizeMaster from './sequilize/sequilizeMaster';
import configApp from './configApp';
import server from './server';
import swagger from './swagger';

const loader = async (app) => {
  try {
    await configApp(app);
    await sequilizeMaster();
    await server(app);
    swagger(app);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default loader;
