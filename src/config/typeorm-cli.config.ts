import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from "../users/entities/user.entity";
import { Task } from "../tasks/entities/task.entity";
import { InitialShema1739881327761 } from '../migrations/1739881327761-initial-shema'

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Task],
  migrations: [InitialShema1739881327761],
});
