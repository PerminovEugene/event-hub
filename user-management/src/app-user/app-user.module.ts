import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppUser } from './app-user.entity';
import { AppUserService } from './app-user.service';
import { DatabaseModule } from '../database/database.module';
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
