import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  /**
   * Intercepts the request and transforms the response data to plain objects.
   * @param {ExecutionContext} context - The execution context.
   * @param {CallHandler<any>} next - The call handler.
   * @returns {Observable<any>} An observable that emits the transformed data.
   */
  intercept(context: ExecutionContext, next: CallHandler<any>): any {
    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          data: instanceToPlain(data),
        };
      }),
    );
  }
}
