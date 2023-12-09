import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Comment {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  @ApiProperty({
    description: '댓글',
    required: true,
    example: '저는 댓글입니다',
  })
  comment: string;
}
