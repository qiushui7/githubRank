import { Controller, Post, Body } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('api/auth/github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Post('callback')
  async handleCallback(@Body('code') code: string) {
    return this.githubService.handleCallback(code);
  }
}
