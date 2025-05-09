import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';
import { Api } from 'package/utils/api-methods';
import { Authorized } from './authorized.decorator';
import { ApiMethods } from 'package/utils/api-methods';
import { Roles } from 'src/user/data/user.schema';

export function AuthorizedApi({
  api,
  url,
  role = [],
}: {
  api: Api;
  url: string;
  role?: Roles[];
}) {
  return applyDecorators(
    Authorized({ role }),
    api === Api.POST ? HttpCode(HttpStatus.CREATED) : HttpCode(HttpStatus.OK),
    new ApiMethods(url).get(api),
  );
}
