import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [GithubController],
  providers: [GithubService],
})
export class AuthModule {}
