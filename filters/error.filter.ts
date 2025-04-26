import { Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class ErrorExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(ErrorExceptionFilter.name);

  static toErrorResponse(exception: any) {
    let message = 'Internal server error';
    let statusCode = 500;

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      statusCode = exception.getStatus();

      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response['message']) {
        message = response['message'];
      }
    } else if (exception?.message) {
      message = exception.message;
    }

    return new GraphQLError(message, {
      extensions: {
        code: 'Request Error',
        statusCode,
        message,
      },
    });
  }

  catch(exception: any) {
    this.logger.error('GraphQL Exception', exception);
    return ErrorExceptionFilter.toErrorResponse(exception);
  }
}
