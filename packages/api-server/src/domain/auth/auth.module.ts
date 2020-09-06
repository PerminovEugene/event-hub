import { DynamicModule, Module } from '@nestjs/common';
import { AppUserModule } from '../app-user/app-user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';

// @Module({
//   imports: [AppUserModule, PassportModule],
//   providers: [AuthService, AuthResolver, LocalStrategy, SessionSerializer],
//   exports: [AuthService],
// })

/**
 * Modules
 */
type AuthConfig = {
  imports?: Array<any>;
  providers?: Array<any>;
};

@Module({})
export class AuthModule {
  static forRoot(authConfig: AuthConfig = {}): DynamicModule {
    return {
      module: AuthModule,
      imports: [AppUserModule, ...authConfig.imports],
      providers: [
        AuthService,
        AuthResolver,
        SessionSerializer,
        ...authConfig.providers,
      ],
      exports: [AuthService],
    };
  }
}
