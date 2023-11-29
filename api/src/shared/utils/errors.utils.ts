import { HttpStatus } from '@nestjs/common';

export class ErrorUtil {
  static handleServiceError(error: any, entityName: string): any {
    if (error.getStatus() === HttpStatus.CONFLICT) {
      return {
        message: `${entityName} already exists`,
        error: true,
      };
    } else if (error.getStatus() === HttpStatus.BAD_REQUEST) {
      return {
        message: `Failed to create ${entityName}`,
        error: true,
      };
    } else {
      return {
        message: `An unexpected error occurred while handling ${entityName}`,
        error: true,
      };
    }
  }
}
