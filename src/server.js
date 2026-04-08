const app = require('./app');
const env = require('./config/env');
const pool = require('./db/pool');

async function startServer() {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected');

    app.listen(env.PORT, () => {
      console.log(`Server listening on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
