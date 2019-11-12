import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    debugger;
    return ctx.req.user;
  },
);
