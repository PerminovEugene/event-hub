import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppUserModule } from '../app-user/app-user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    AppUserModule,
    PassportModule.register({ defaultStrategy: 'local', session: true }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
