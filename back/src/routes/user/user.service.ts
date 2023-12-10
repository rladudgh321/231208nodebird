import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async signup(data: SignUpDto) {
    const { email, password, nickname } = data;
    const exUser = await this.getUserByEmail(email);
    if (exUser)
      throw new HttpException(
        '이미 회원가입 되어 있는 이메일입니다',
        HttpStatus.FORBIDDEN,
      );
    const hashPassword = await hash(password, 12);
    const newUser = this.userRepository.create({
      email,
      password: hashPassword,
      nickname,
    });
    await this.userRepository.save({
      email,
      password: hashPassword,
      nickname,
    });
    return newUser;
  }
}
