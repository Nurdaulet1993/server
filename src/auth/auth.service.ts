import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { Buffer } from "buffer"
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp({ email, password, profile }: SignUpDto) {
    // Check if email is already taken
    const existUser = await this.usersService.findByEmail(email);
    if (existUser.length) throw new BadRequestException('email in use');
    // Generate a salt and hash the password
    const salt = randomBytes(8).toString('hex'); // Random text
    const hash = (await scrypt(password, salt, 32)) as Buffer; // 32 rounds of hashing
    const result = `${salt}.${hash.toString('hex')}`;
    return this.usersService.create({ email, password: result, profile });
  }


  async validateUser({ email, password }: SignInDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null; // User not found

    const [salt, hashedPassword] = user.password.split('.');
    const hash = await scrypt(password, salt, 32) as Buffer; // 32 rounds of hashing
    if (hash.toString('hex') !== hashedPassword) return null;

    const { password: usesPassword, ...result } = user;
    return result;
  }

  signIn(user: Omit<User, "password">) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: Omit<User, "password">) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, { expiresIn: '60s' }),
    };
  }
}
