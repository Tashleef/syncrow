import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from './role-set-metadata.role';
import { RoleGuard } from 'package/guards/role.guard';
import { Roles } from 'src/user/data/user.schema';

export function Authorized({ role }: { role: Roles[] }) {
  return applyDecorators(Role(role), UseGuards(RoleGuard));
}
