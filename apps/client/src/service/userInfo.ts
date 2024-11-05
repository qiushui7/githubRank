import service from './index';

export const getUserInfo = (github_id: string) =>
  service.get('/info/userInfo', {
    params: {
      github_id,
    },
  });

export const getUserIssues = (github_id: string) =>
  service.get('/info/issueInfo', {
    params: {
      github_id,
    },
  });

export const getUserRepositories = (github_id: string) =>
  service.get('/info/reposInfo', {
    params: {
      github_id,
    },
  });

export const guessNation = (github_id: string) =>
  service.get('/info/guessNation', {
    params: {
      github_id,
    },
  });

export const getUserSummary = (github_id: string) =>
  service.get('/info/summary', {
    params: {
      github_id,
    },
  });

export const getUserTechStack = (github_id: string) =>
  service.get('/info/techInfo', {
    params: {
      github_id,
    },
  });
