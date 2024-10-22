import { Router, Request, Response } from 'express';
import { BrowsingActivity } from '../models/BrowsingActivity';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { url, searchTerm, thumbnail, timeSpent, timestamp } = req.body;

    const activity = new BrowsingActivity({
      url,
      searchTerm,
      thumbnail,
      timeSpent,
      timestamp: new Date(timestamp),
    });

    await activity.save();

    res.status(201).json({ message: 'Activity logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log activity', details: error });
  }
});

export { router as logActivityRoute };
