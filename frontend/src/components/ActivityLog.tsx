import React, { useEffect, useState } from 'react';
import { fetchActivities } from '../services/activityService';

interface Activity {
  url: string;
  searchTerm?: string;
  thumbnail?: string;
  timeSpent: number;
  timestamp: string;
}

const ActivityLog: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities()
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Browsing Activity Log</h1>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <div className="url">
              {activity.searchTerm ? `Search Term: ${activity.searchTerm}` : `URL: ${activity.url}`}
            </div>
            {activity.thumbnail && (
              <img src={activity.thumbnail} alt="Thumbnail" width="120" height="90" />
            )}
            <div className="time">
              Time spent: {activity.timeSpent ? (activity.timeSpent / 1000).toFixed(2) : 'N/A'} seconds
            </div>
            <div className="timestamp">
              Timestamp: {new Date(activity.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;