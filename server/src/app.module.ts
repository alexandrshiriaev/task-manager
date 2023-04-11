import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
