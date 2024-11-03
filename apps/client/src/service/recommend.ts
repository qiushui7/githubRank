import service from './index';
export const getRecommendDevelopers = (since: string) =>
  service.get('/recommend', {
    params: {
      since,
    },
  });
