import service from './index';

export interface Tech {
  confidence: string;
  tech: string;
}

export interface SearchParams {
  target_language: string;
  nation: string;
  techs: Tech[];
}

export const searchDevelopers = (
  keyword: string,
  pagesize: number,
  curpage: number,
  data: SearchParams,
) => {
  return service.post(
    `/info/search?keyword=${keyword}&pagesize=${pagesize}&curpage=${curpage}`,
    data,
  );
};
