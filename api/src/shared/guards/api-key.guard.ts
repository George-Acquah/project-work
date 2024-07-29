import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    console.log(apiKey);
    const validApiKey = this.configService.get<string>('API_KEY');
    console.log(validApiKey);

    if (apiKey && apiKey === validApiKey) {
      return true;
    } else {
      throw new UnauthorizedException('Invalid API key');
    }
  }
}
