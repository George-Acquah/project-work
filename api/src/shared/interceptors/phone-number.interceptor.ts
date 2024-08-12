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
export class PhoneNumberInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest() as Request;
    const body = request.body;

    if (body.mobileNumber) {
      body.mobileNumber = this.convertToE164(body.mobileNumber);
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  }

  private convertToE164(mobileNumber: string): string {
    if (mobileNumber.startsWith('0') && mobileNumber.length === 10) {
      return `+233${mobileNumber.slice(1)}`;
    }
    return mobileNumber; // Return the original if it's already in E164 format or invalid
  }
}
