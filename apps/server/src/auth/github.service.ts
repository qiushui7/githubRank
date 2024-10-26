import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async handleCallback(code: string) {
    const clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GITHUB_CLIENT_SECRET');

    try {
      const tokenResponse = await lastValueFrom(this.httpService.post('https://github.com/login/oauth/access_token', {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }, {
        headers: { Accept: 'application/json' },
      }));

      const accessToken = tokenResponse.data.access_token;

      const userResponse = await lastValueFrom(this.httpService.get('https://api.github.com/user', {
        headers: { Authorization: `token ${accessToken}` },
      }));

      return {
        access_token: accessToken,
        user: userResponse.data,
      };
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      throw new Error('Failed to authenticate with GitHub');
    }
  }
}
