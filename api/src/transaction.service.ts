import { Injectable } from '@nestjs/common';
import { Connection, ClientSession } from 'mongoose';

@Injectable()
export class TransactionService {
  async mongooseTransactionHandler<T = any>(
    method: (session: ClientSession) => Promise<T>,
    connection: Connection,
    session?: ClientSession
  ): Promise<T> {
    let isNewSession = false;

    // If session is not provided, start a new one
    if (!session) {
      session = await connection.startSession();
      session.startTransaction();
      isNewSession = true;
    }

    let result: T;
    try {
      // Execute the method within the transaction session
      result = await method(session);

      // If it's a new session, commit the transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
    } catch (error) {
      // If it's a new session, abort the transaction
      if (isNewSession) {
        await session.abortTransaction();
      }
      throw error; // Re-throw the error to propagate it to the caller
    } finally {
      // If it's a new session, end it
      if (isNewSession) {
        session.endSession();
      }
    }

    return result;
  }
}
