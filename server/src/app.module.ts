import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { GroupsModule } from './groups/groups.module';

const envFilePath = () => `.${process.env.NODE_ENV}.env`
const mongodbUrl = () => process.env.MONGODB_CONNECTION_STRING.replace('<username>', process.env.MONGODB_USERNAME).replace('<password>', process.env.MONGODB_PASSWORD)

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: envFilePath()
    }),
    MongooseModule.forRoot(mongodbUrl()),
    AuthModule,
    UsersModule,
    TasksModule,
    GroupsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
