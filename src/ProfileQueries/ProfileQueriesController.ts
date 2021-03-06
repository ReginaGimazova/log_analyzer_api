import ProfileQueriesDataStore from "./ProfileQueriesDataStore";
import ControllerBase from "../helpers/ControllerBase";
import {checkTableInDatabase} from "../Initial/CheckTableInDatabase";
import databasePrepare from "../Initial/DatabasePrepare";

export class ProfileQueriesController extends ControllerBase {
  private getProfileInfoIfSuccess = async (req, res) => {
    const profileQueriesDataStore = new ProfileQueriesDataStore();
    const {page, tables, limit} = this.parseRequest(req);

    await profileQueriesDataStore.getProfileInfo(tables,(data, err) => {
      if (err)
        res.status(500).send({
          message: err.message || "Server error occurred while retrieving profile info."
        });
      else {
        const pageCount = Math.ceil(data.length / 10);
        res.status(200).send({
          page: page > pageCount ? pageCount : page,
          pageCount,
          queries: data.slice(page * limit - limit, page * limit)
        });
      }
    });
  };

  public getAll = async (req, res) => {
    const existCheckResult = await checkTableInDatabase.checkTable('profile_replay_info');

    if (!existCheckResult) {
      res.status(200).send({
        page: 0,
        pageCount: 0,
        queries: [],
      });

      return;
    }

    await this.getProfileInfoIfSuccess(req, res);
  };

  public update = async (req, res) => {
    const profileQueriesDataStore = new ProfileQueriesDataStore();
    await databasePrepare.truncateCurrentTable('profile_replay_info');

    profileQueriesDataStore.updateProfileResult(async (error) => {
      if (error)
        res.status(500).send({
          message:
            error.message ||
            'Error occurred on the server while receiving profile info data.',
        });
      else {
        await this.getProfileInfoIfSuccess(req, res)
      }
    })
  };
}

export const profileQueriesController = new ProfileQueriesController();