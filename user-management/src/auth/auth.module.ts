import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppUserModule } from '../app-user/app-user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthResolver } from './auth.resolver';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [AppUserModule, PassportModule],
  providers: [AuthService, AuthResolver, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
