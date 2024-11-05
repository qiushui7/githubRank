import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getgid } from 'process';

interface PrefetchConfig {
  [path: string]: (httpService: HttpService, path: string) => Promise<any>;
}

@Injectable()
export class RoutePrefetchService {
  constructor(private readonly httpService: HttpService) {}

  private readonly config: PrefetchConfig = {
    '/': async (httpService: HttpService, path: string) => {
      try {
        const response = await firstValueFrom(
          httpService.get('http://49.232.63.254:9000/recommend', {
            params: {
              since: 'daily',
            },
          }),
        );

        // 清理数据，确保服务端和客户端数据一致
        const cleanedData = response.data.map((dev: any) => ({
          ...dev,
          bio: dev.bio?.trim().replace(/\r?\n/g, ' ') || '', // 移除换行符并替换为空格
          name: dev.name?.trim() || '',
          location: dev.location?.trim() || '',
          // ... 其他需要清理的字段
        }));

        return {
          recommendDevelopers: cleanedData,
        };
      } catch (error) {
        console.error('Prefetch error:', error);
        return {
          recommendDevelopers: [],
        };
      }
    },
    '/userInfo': async (httpService: HttpService, path: string) => {
      const id = path.split('/')[2];
      const [userInfoResult, repositoriesResult] = await Promise.allSettled([
        firstValueFrom(
          httpService.get('http://49.232.63.254:9000/info/userInfo', {
            params: {
              github_id: id,
            },
          }),
        ),
        firstValueFrom(
          httpService.get('http://49.232.63.254:9000/info/reposInfo', {
            params: {
              github_id: id,
            },
          }),
        ),
      ]);
      return {
        [`${id}`]: {
          userInfo:
            userInfoResult.status === 'fulfilled'
              ? userInfoResult.value.data
              : {},
          repositories:
            repositoriesResult.status === 'fulfilled'
              ? repositoriesResult.value.data
              : [],
        },
      };
    },
  };

  async getPrefetchData(path: string): Promise<any> {
    const prefetchFn = this.config['/' + path.split('/')[1]];
    if (prefetchFn) {
      return await prefetchFn(this.httpService, path);
    }
    return {};
  }
}
