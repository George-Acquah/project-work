import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { _TSanitizedUser } from '../interfaces/users.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): _TSanitizedUser => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as _TSanitizedUser;
  }
);
