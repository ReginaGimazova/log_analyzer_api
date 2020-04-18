import { Request, Response } from 'express';
import ParametrizedQueriesDataStore from './ParametrizedQueriesDataStore';

export class ParametrizedQueriesController {
  public getAll(req: Request, res: Response) {
    const parametrizedQueriesDataStore = new ParametrizedQueriesDataStore();

    parametrizedQueriesDataStore.getAll((data, err) => {
      if (err)
        res.status(404).send({
          message:
            err.message ||
            'Server error occurred while retrieving parametrized queries.',
        });
      else res.status(200).send(data);
    });
  }
}

export const parametrizedQueriesController = new ParametrizedQueriesController();