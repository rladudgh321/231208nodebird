import { Injectable } from '@nestjs/common';
import { UserService } from 'src/routes/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) return null;
    const match = await compare(password, user.password);
    if (!match) return null;
    return user;
  }
}
