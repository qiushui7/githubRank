import service from './index';
export const getRecommendDevelopers = async (since: string) => {
  try {
    const response = await service.get(
      import.meta.env.VITE_SERVER_URL + '/recommend',
      {
        params: {
          since,
        },
      },
    );
    return response;
  } catch (error) {
    return false;
  }
};
