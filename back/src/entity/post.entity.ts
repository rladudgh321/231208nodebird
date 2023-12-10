import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Hashtag } from './hashtag.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  @ApiProperty({
    description: '내용',
    required: true,
    example: '안녕하세요',
  })
  contents: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
  @JoinTable({
    name: 'PostHashtag',
    joinColumn: { name: 'PostId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'HashtagId', referencedColumnName: 'id' },
  })
  hashtags: Hashtag[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => Post, (post) => post.retweet)
  retweet: Post[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'Like',
    joinColumn: { name: 'likerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'likedId', referencedColumnName: 'id' },
  })
  likers: User[];
}
