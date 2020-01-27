import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppUserModule } from '../app-user/app-user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [AppUserModule, PassportModule],
  providers: [AuthService, AuthResolver, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
