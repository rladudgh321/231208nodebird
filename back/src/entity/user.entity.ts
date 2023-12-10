import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from './post.entity';

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
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'Follow',
    joinColumn: { name: 'FollowingId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'FollowerId', referencedColumnName: 'id' },
  })
  followings: User[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'Follow',
    joinColumn: { name: 'FollowerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'FollowingId', referencedColumnName: 'id' },
  })
  followers: User[];

  @ManyToMany(() => Post, { cascade: true })
  liked: Post[];
}
