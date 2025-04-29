import { AuthenticatedController } from 'package/decorator/authentication/authenticated-controller.decorator';
import { AuthorizedApi } from 'package/decorator/authorization/authorization.decorator';
import { Api } from 'package/utils/api-methods';
import { UserValidation } from '../validation';
import { Body } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { Roles } from 'src/user/data/user.schema';
import { UserDto } from '../dto/type';
@AuthenticatedController({
  controller: 'users',
})
export class UserController {
  constructor(
    private readonly userValidation: UserValidation,
    private readonly userService: UserService,
  ) {}

  @AuthorizedApi({
    api: Api.POST,
    role: [Roles.ADMIN],
    url: '/',
  })
  async create(@Body() body: UserDto) {
    this.userValidation.create({ body });
    return this.userService.createUser(body);
  }
}
