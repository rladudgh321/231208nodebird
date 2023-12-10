import { Controller, Post, Get, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post() //signup
  signup(@Body(new ValidationPipe()) data: SignUpDto) {
    return this.userService.signup(data);
  }
}
