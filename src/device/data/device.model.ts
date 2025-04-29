import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceType } from '../enums/device.enums';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, enum: DeviceType })
  type: DeviceType;

  @Column({ type: 'jsonb' })
  location: {
    lng: number;
    lat: number;
  };
}
