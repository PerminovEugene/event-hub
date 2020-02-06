import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../local.strategy';

export const passportLocalAuthConfig = {
  imports: [PassportModule],
  providers: [LocalStrategy],
};
