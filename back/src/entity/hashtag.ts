import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Hashtag {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  @ApiProperty({
    description: '해시태그',
    required: true,
    example: '#해시태그',
  })
  name: string;
}
