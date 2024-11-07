import service from './index';

export const getComments = async (
  github_id: string,
  curpage = 1,
  pageSize = 10,
) => {
  return service.get('/user/getAppraise', {
    params: { github_id, curpage, pageSize },
  });
};

export const createComment = async (data: {
  github_id: string;
  message: string;
  number: number;
  avatar_url: string;
}) => {
  return service.post('/user/appraise', data, {
    withCredentials: true,
  });
};
