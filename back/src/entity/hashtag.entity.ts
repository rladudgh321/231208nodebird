import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
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

  @ManyToMany(() => Post, (post) => post.hashtags)
  posts: Hashtag[];
}
