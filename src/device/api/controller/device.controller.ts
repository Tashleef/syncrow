import { DeviceValidation } from '../validation/device.validation';
import { Body, Param, Query } from '@nestjs/common';
import { DeviceService } from '../../service/device.service';
import { Params } from 'package/component/params/params';
import { paginationParser } from 'package/pagination/pagination';
import { DeviceDto, GetAllDevices } from '../dto/device.dto';
import { AuthorizedApi } from 'package/decorator/authorization/authorization.decorator';
import { Api } from 'package/utils/api-methods';
import { Roles } from 'src/user/data/user.schema';
import { AuthenticatedController } from 'package/decorator/authentication/authenticated-controller.decorator';
import { DeviceGateway } from '../gateway/device.gateway';

@AuthenticatedController({ controller: 'devices' })
export class DeviceController {
  constructor(
    private readonly deviceValidation: DeviceValidation,
    private readonly deviceService: DeviceService,
    private readonly deviceGateway: DeviceGateway,
  ) {}
  @AuthorizedApi({
    api: Api.POST,
    role: [Roles.ADMIN],
    url: '/',
  })
  async create(@Body() body: DeviceDto) {
    this.deviceValidation.create({ body });
    const device = await this.deviceService.create(body);
    this.deviceGateway.sendDeviceEvent('deviceCreated', device);
    return device;
  }
  @AuthorizedApi({
    api: Api.PATCH,
    role: [Roles.ADMIN],
    url: '/:id',
  })
  async update(@Body() body: DeviceDto, @Param() params: Params) {
    this.deviceValidation.update({ body, params });
    const device = await this.deviceService.update(+params.id, body);
    this.deviceGateway.sendDeviceEvent('deviceUpdated', device);
    return device;
  }

  @AuthorizedApi({
    api: Api.GET,
    role: [Roles.ADMIN, Roles.USER],
    url: '/:id',
  })
  async findOne(@Param() params: Params) {
    this.deviceValidation.paramsId({ params });
    return await this.deviceService.findOne(+params.id);
  }

  @AuthorizedApi({
    api: Api.GET,
    role: [Roles.ADMIN, Roles.USER],
    url: '/',
  })
  async findAll(@Query() query: GetAllDevices) {
    this.deviceValidation.getAllDevices({ query });
    const { criteria, pagination } = paginationParser(query);
    return await this.deviceService.findAll({ ...criteria, ...pagination });
  }
  @AuthorizedApi({
    api: Api.DELETE,
    role: [Roles.ADMIN],
    url: '/:id',
  })
  async delete(@Param() params: Params) {
    this.deviceValidation.paramsId({ params });
    const result = await this.deviceService.delete(+params.id);
    this.deviceGateway.sendDeviceEvent('deviceDeleted', { id: +params.id });
    return result;
  }
}
