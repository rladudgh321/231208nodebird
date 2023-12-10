import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: '이메일',
    required: true,
    example: 'kkk@google.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    required: true,
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '닉네임',
    required: true,
    example: '홍길동',
  })
  nickname: string;
}
