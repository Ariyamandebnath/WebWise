// src/routes/fetchActivities.ts
import { Router, Request, Response } from 'express';
import { BrowsingActivity } from '../models/BrowsingActivity';

const router = Router();

// Route to fetch all browsing activities
router.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const activities = await BrowsingActivity.find();

    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: 'No activities found' });
    }

    return res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return res.status(500).json({
      error: 'Failed to fetch activities',
      details: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

export { router as fetchActivitiesRoute };