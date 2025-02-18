import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { CreateProfileDto } from "../../profiles/dto/create-profile.dto";

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  profile: CreateProfileDto | null;
}
