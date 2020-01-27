import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DatabaseModule } from '../../database/database.module';
import { AppUser } from './app-user.entity';
import { AppUserService } from './app-user.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'APP_USER_REPOSITORY', // TODO
      useFactory: (connection: Connection) => connection.getRepository(AppUser),
      inject: ['DATABASE_CONNECTION'],
    },
    AppUserService,
  ],
  exports: [AppUserService],
})
export class AppUserModule {}
