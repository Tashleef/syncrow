import { Injectable } from '@nestjs/common';
import { DeviceRepository } from '../data/device.repository';
import { CommonError } from 'src/common/error.service';
import { FilterService } from 'package/helpers/filtering-service';
import { DeviceDto, GetAllDevices } from '../api/dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly errorHandler: CommonError,
  ) {}

  async findAll({ take, skip, ...query }: GetAllDevices) {
    const filter = new FilterService();
    if (query.search) {
      filter.substring('name', query.search);
    }
    if (query.type) {
      filter.substring('type', query.type);
    }

    return await this.deviceRepository.findAndCount({
      where: filter.build(),
      options: { skip, take },
    });
  }
  async findOne(id: number) {
    return await this.deviceRepository.findOne({
      where: { id },
      error: this.errorHandler.notFoundError(),
    });
  }
  async create(data: DeviceDto) {
    return this.deviceRepository.create({ doc: data });
  }
  async update(id: number, data: Partial<DeviceDto>) {
    await this.deviceRepository.findOne({
      where: { id },
      error: this.errorHandler.notFoundError(),
    });

    return await this.deviceRepository.update({
      where: { id },
      update: data,
    });
  }
  async delete(id: number) {
    return await this.deviceRepository.delete({ criteria: { id } });
  }
}
