import { IsString } from "class-validator";

export class GetTasksDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
