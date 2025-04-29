import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from '../data/user.repository';
import { CommonError } from 'src/common/error.service';
import { UserDto } from '../api/dto/type';
import { usersData } from 'src/db/seed/users.data';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private commonError: CommonError,
  ) {}

  async seed() {
    const count = await this.userRepository.count({});
    if (!count) {
      await this.userRepository.create({ doc: usersData });
    }

    return;
  }

  async createUser(body: UserDto) {
    let user = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if (user) {
      throw new HttpException(
        'this.userError.userAlreadyExist()',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = await this.userRepository.create({
      doc: body,
    });
    delete user.password;
    return user;
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      error: this.commonError.notFoundError(),
    });
  }
}
