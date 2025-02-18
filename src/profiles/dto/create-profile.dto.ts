import { IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
