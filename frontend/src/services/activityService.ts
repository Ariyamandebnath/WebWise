import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export async function fetchActivities() {
  try {
    const response = await api.get('/fetch-activities');
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch activities');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
