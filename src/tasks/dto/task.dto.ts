import { Expose, Transform } from "class-transformer";

export class TaskDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Transform(({obj}) => obj.user.id)
  @Expose()
  userId: number;
}
