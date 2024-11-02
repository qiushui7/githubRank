import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface PrefetchConfig {
  [path: string]: (httpService: HttpService) => Promise<any>;
}

@Injectable()
export class RoutePrefetchService {
  constructor(private readonly httpService: HttpService) {}

  private readonly config: PrefetchConfig = {
    '/': async (httpService: HttpService) => {
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
  };

  async getPrefetchData(path: string): Promise<any> {
    const prefetchFn = this.config[path];
    if (prefetchFn) {
      return await prefetchFn(this.httpService);
    }
    return {};
  }
}
