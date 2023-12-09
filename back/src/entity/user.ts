import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  @ApiProperty({
    description: '이메일',
    required: true,
    example: 'kkk@naver.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: '비밀번호',
    required: true,
  })
  password: string;

  @Column()
  @ApiProperty({
    description: '닉네임',
    required: true,
    example: '홍길동',
  })
  nickname: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];
}
