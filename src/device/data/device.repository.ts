import { Injectable } from '@nestjs/common';
import { TypeOrmRepository } from 'package/database/typeOrm/typeOrm.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.model';

@Injectable()
export class DeviceRepository extends TypeOrmRepository<Device> {
  constructor(
    @InjectRepository(Device)
    readonly device: Repository<Device>,
  ) {
    super(device);
  }
}
