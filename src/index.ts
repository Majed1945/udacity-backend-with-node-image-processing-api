import express from 'express';
import routes from './routes/indexRoutes';
import { logger } from './middlewares/loggerMiddleware';

const app = express();
const port = 3000;

app.use(logger);
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
