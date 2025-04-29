import { Roles, User } from 'src/user/data/user.schema';

export interface JWTPayload {
  id: number;
  username: string;
  role: Roles[];
}

export function buildJWTPayload(user: User) {
  const { id, username, role } = user;

  const rolesArray = [role];

  const result: JWTPayload = {
    id,
    username,
    role: rolesArray,
  };
  return result;
}
