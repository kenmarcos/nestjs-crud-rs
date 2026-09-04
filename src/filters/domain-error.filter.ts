import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityNotFoundError } from '../errors/entity-not-found.error';
import { EntityAlreadyExistsError } from '../errors/entity-already-exists.error';
import { Response } from 'express';
import { UnauthorizedError } from '../errors/unauthorized.error';

const customErrors = [
  EntityNotFoundError,
  EntityAlreadyExistsError,
  UnauthorizedError,
];

@Catch(...customErrors)
export class DomainErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const httpException = this.toHttpException(error);
    const response = host.switchToHttp().getResponse<Response>();

    response
      .status(httpException.getStatus())
      .json(httpException.getResponse());
  }

  private toHttpException(error: Error): HttpException {
    if (error instanceof EntityNotFoundError) {
      return new NotFoundException(error.message);
    }
    if (error instanceof EntityAlreadyExistsError) {
      return new ConflictException(error.message);
    }
    if (error instanceof UnauthorizedError) {
      return new UnauthorizedException(error.message);
    }
    throw error;
  }
}
