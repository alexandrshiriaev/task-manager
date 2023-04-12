import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.SECRET_JWT}`,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([{name: RefreshToken.name, schema: RefreshTokenSchema}])
  ],
})
export class AuthModule {

}
