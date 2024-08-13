import express from 'express';
import cors from 'cors';
import * as path from 'path';

import { initializeDatabase } from "./database/database.impl";
import { registerControllersToExpress } from './http';

(async () => {
  const app = express();
  
  await initializeDatabase(process.env.DB_CONNECTION_STRING || '');
  
  app.use(cors())
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  
  registerControllersToExpress(app);

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
  server.on('error', console.error);
})();
