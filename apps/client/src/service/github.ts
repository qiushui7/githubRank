import axios from 'axios';
import CustomError from '../utils/customError';

class MissingParamError extends Error {
  constructor(params: string[]) {
    super(`Missing required params: ${params.join(', ')}`);
    this.name = 'MissingParamError';
  }
}

interface LanguageNode {
  name: string;
  color: string;
  size: number;
  count: number;
}

interface RepoNode {
  name: string;
  size: number;
  languages: {
    edges: Array<{
      size: number;
      node: {
        color: string;
        name: string;
      };
    }>;
  };
}

interface LanguageEdge {
  size: number;
  node: {
    color: string;
    name: string;
  };
}

export const request = (
  data: Record<string, string>,
  headers: Record<string, string>,
) => {
  return axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    headers,
    data,
  });
};

const fetcher = (variables: any) => {
  return request(
    {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
        repositories(ownerAffiliations: OWNER,  first: 100) {
            nodes {
              name
              url
              isFork
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables,
    },
    {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  );
};

const logger = {
  error: (message: any) => console.error(message),
};

const wrapTextMultiline = (
  text: string,
  width: number,
  indent: number,
): string[] => {
  return text.match(new RegExp(`.{1,${width}}`, 'g')) || [text];
};

const fetchTopLanguages = async (
  username: string,
  exclude_repo: string[] = [],
  size_weight = 1,
  count_weight = 0,
) => {
  if (!username) {
    throw new MissingParamError(['username']);
  }

  const res = await fetcher({ login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    if (res.data.errors[0].type === 'NOT_FOUND') {
      throw new CustomError(
        res.data.errors[0].message || 'Could not fetch user.',
        CustomError.USER_NOT_FOUND,
      );
    }
    if (res.data.errors[0].message) {
      throw new CustomError(
        wrapTextMultiline(res.data.errors[0].message, 90, 1)[0],
        res.statusText,
      );
    }
    throw new CustomError(
      'Something went wrong while trying to retrieve the language data using the GraphQL API.',
      CustomError.GRAPHQL_ERROR,
    );
  }

  let repoNodes = res.data.data.user.repositories.nodes as RepoNode[];
  const repoToHide: Record<string, boolean> = {};

  if (exclude_repo) {
    exclude_repo.forEach((repoName) => {
      repoToHide[repoName] = true;
    });
  }

  repoNodes = repoNodes
    .sort((a, b) => b.size - a.size)
    .filter((node) => !repoToHide[node.name]);

  let repoCount = 0;

  const langNodes = repoNodes
    .filter((node) => node.languages.edges.length > 0)
    .reduce<LanguageEdge[]>(
      (acc, curr) => [...acc, ...curr.languages.edges],
      [],
    )
    .reduce<Record<string, LanguageNode>>((acc, prev) => {
      let langSize = prev.size;

      if (acc[prev.node.name] && prev.node.name === acc[prev.node.name].name) {
        langSize = prev.size + acc[prev.node.name].size;
        repoCount += 1;
      } else {
        repoCount = 1;
      }

      return {
        ...acc,
        [prev.node.name]: {
          name: prev.node.name,
          color: prev.node.color,
          size: langSize,
          count: repoCount,
        },
      };
    }, {});

  Object.keys(langNodes).forEach((name) => {
    langNodes[name].size =
      Math.pow(langNodes[name].size, size_weight) *
      Math.pow(langNodes[name].count, count_weight);
  });

  const topLangs = Object.keys(langNodes)
    .sort((a, b) => langNodes[b].size - langNodes[a].size)
    .reduce<Record<string, LanguageNode>>((result, key) => {
      result[key] = langNodes[key];
      return result;
    }, {});

  return topLangs;
};

export { fetchTopLanguages };
