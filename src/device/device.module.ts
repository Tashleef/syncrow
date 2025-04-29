import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceService } from './service/device.service';
import { DeviceRepository } from './data/device.repository';
import { DeviceValidation } from './api/validation/device.validation';
import { DeviceController } from './api/controller/device.controller';
import { CommonError } from 'src/common/error.service';
import { Device } from './data/device.model';
import { DeviceGateway } from './api/gateway/device.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [DeviceController],
  providers: [
    DeviceService,
    DeviceRepository,
    DeviceValidation,
    CommonError,
    DeviceGateway,
  ],
  exports: [DeviceService],
})
export class DeviceModule {}
