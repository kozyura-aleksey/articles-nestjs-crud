import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    return user;
  },
);
export default UserDecorator;
