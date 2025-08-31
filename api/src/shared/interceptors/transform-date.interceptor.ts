import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformDateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest() as Request;

    if (request.body) {
      // Process start_date if it's a string
      if (typeof request.body.start_time === 'string') {
        request.body.start_time = new Date(request.body.start_time);
      }
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  }
}
