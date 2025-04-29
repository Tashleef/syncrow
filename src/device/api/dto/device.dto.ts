import { GetByCriteria } from 'package/pagination/dto';
import { DeviceType } from 'src/device/enums/device.enums';

export class DeviceDto {
  id?: number;
  name: string;
  description: string;
  type: DeviceType;
  location: {
    lng: number;
    lat: number;
  };
}

export interface GetAllDevices extends GetByCriteria {
  search?: string;
  type?: DeviceType;
}
