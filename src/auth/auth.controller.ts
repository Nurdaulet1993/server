import { Body, Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.gurad";
import { GetUser } from "./get-user.decorator";
import { User } from "../users/entities/user.entity";

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}
  @Post('sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Request() req) {
    return this.authService.signIn(req.user)
  }


  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.signIn(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@GetUser() user: Omit<User, "password">){
    return user;
  }
}
