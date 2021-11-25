const app = require('./app');
// const sequelize = require('./database/db');

const PORT = app.get('port');

app.listen(PORT, async () => {
  console.log(`Listening on http://localhost:${PORT}`);

  // try {
  //   await sequelize.authenticate();
  //   console.log('Conexion exitosa a la base de datos!');
  // } catch (error) {
  //   console.error('No se puede conectar a la base de datos:', error);
  // }
});
