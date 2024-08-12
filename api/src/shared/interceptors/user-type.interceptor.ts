import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserType } from '../enums/users.enum';

@Injectable()
export class TransformUserTypeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest() as Request;
    console.log(request.query);

    if (request.query && typeof request.query.type === 'string') {
      switch (request.query.type) {
        case 'Customer':
          request.query.type = UserType.CUSTOMER;
          break;
        case 'ParkOwner':
          request.query.type = UserType.PARK_OWNER;
          break;
        case 'Admin':
          request.query.type = UserType.ADMIN;
          break;
        default:
          request.query.type = '';
          break;
      }
    }
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  }
}
