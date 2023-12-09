import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Image {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  @ApiProperty({
    description: '이미지 주소',
    required: true,
  })
  src: string;
}
