
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // tslint:disable-next-line: variable-name
  use(_req: Request, _res: Response, next: () => void) {
    // console.log('Request...');
    next();
  }
}
