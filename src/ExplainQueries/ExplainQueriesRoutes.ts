import * as express from 'express';
import { explainQueriesController } from './ExplainQueriesController';

class ExplainQueriesRoutes {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get('/', (req: express.Request, res: express.Response) => {
      explainQueriesController.getAll(req, res)
    });
  }
}

export const explainQueriesRoutes = new ExplainQueriesRoutes().router;