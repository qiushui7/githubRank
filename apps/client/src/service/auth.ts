import axios from 'axios';

export const checkGitHubToken = async (token: string) => {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
