import { DataSource} from "typeorm";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";
import { User } from "./src/users/entities/user.entity";
import { Task } from "./src/tasks/entities/task.entity";
import { Profile } from "./src/profiles/entities/profile.entity";

config();

const configService = new ConfigService()
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: configService.get('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Task, Profile],
  migrations: ['migrations/**']
})
