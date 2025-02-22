import { Expose } from "class-transformer";
import { Role } from "../../auth/enums/role.enum";

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: Role;
}
