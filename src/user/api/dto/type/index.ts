import { Roles } from 'src/user/data/user.schema';

export class UserDto {
  username: string;
  password: string;
  role: Roles;
}
