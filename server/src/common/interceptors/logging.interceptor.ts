
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // tslint:disable-next-line: no-console
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        // tslint:disable-next-line: no-console
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
