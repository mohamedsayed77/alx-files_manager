import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import { ObjectId } from 'mongodb';
import Queue from 'bull';

class UsersController {
  // eslint-disable-next-line consistent-return
  static async postNew(req, res) {
    const queue = new Queue('userQueue');
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });

    const users = await dbClient.db.collection('users');
    users.findOne({ email }, async (err, result) => {
      if (result) {
        return res.status(400).json({ error: 'Already exist' });
      }
      const hashedPassword = sha1(password);
      const { insertedId } = await users.insertOne({ email, password: hashedPassword });
      const user = { id: insertedId, email };
      queue.add({ userId: insertedId });
      return res.status(201).json(user);
    });
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');
    const id = await redisClient.get(`auth_${token}`);
    if (id) {
      const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(id) });
      if (user) {
        return res.status(200).json({ id: user._id, email: user.email });
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
}

export default UsersController;
