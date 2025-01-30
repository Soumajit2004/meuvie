import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SessionValidationResult } from '../session-validation-result.type';

export const GetSession = createParamDecorator(
  (_data, ctx: ExecutionContext): SessionValidationResult => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);