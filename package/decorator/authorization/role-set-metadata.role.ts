import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/user/data/user.schema';

export const Role = (role: Roles[]) => SetMetadata('role', role);
