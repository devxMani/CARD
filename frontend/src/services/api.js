const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = {
  async getUserStats(username) {
    const response = await fetch(`${API_BASE_URL}/user/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  }
};

export default api;