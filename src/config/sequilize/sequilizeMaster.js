import sequelizeConnection from './sequelizeConnection';

export default async function sequilizeMaster() {
  try {
    await sequelizeConnection.authenticate().then(() => {
      console.log('database connection true');
    });
    // await Promise.all(Object.keys(db).map(async (modelName) => {
    //   if (db[modelName].sync) {
    //     await db[modelName].sync();
    //     console.log(`model ${modelName} synced`);
    //   }
    // }));
  } catch (error) {
    throw new Error(`[sequelize:error] error connect to the database - ${error.stack}`);
  }
}
