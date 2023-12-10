import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { LocalStrategy } from './local-strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/routes/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, UserModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
