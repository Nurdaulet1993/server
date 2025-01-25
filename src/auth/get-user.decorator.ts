import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from "../users/entities/user.entity";


export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Omit<User, "password"> => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
