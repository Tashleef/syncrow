import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashPassword } from 'package/utils/bcrypt/bcrypt';
export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: Roles.USER,
  })
  role?: Roles;

  @BeforeInsert()
  async hashPasswordBeforeCreate(): Promise<void> {
    if (this.password) {
      this.password = await hashPassword(this.password);
    }

    if (this.username) {
      this.username = this.username.trim();
    }
  }
}
