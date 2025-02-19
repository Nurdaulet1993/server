import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RefreshJwtStrategy } from "./strategies/refresh-token.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy
  ],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   // signOptions: { expiresIn: '1d' }
    // }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
      imports: [ConfigModule]
    })
  ],
  exports: [AuthService]
})
export class AuthModule {}
