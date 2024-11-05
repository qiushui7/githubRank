export interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  visibility: string;
  topics: string[];
  license: {
    key: string;
    name: string;
    url: string;
  } | null;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
}
