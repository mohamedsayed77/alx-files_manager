import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  // Gets the status of redis and db
  static async getStatus(req, res) {
    const redisIsAlive = redisClient.isAlive();
    const dbIsAlive = dbClient.isAlive();
    const status = { redis: redisIsAlive, db: dbIsAlive };
    await res.status(200).json(status);
  }

  // Gets the stats of of the users and files in DB
  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    const stats = { users: usersCount, files: filesCount };
    res.status(200).json(stats);
  }
}

export default AppController;