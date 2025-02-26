import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['dist/**/*.entity.js'],
  entities: ['dist/db/entities/*.js']
};

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;
