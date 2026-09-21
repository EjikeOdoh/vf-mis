import 'dotenv/config';
import { DataSource } from 'typeorm';

const database = process.env.SQLITE_DB || './data/dev.sqlite';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});

export default AppDataSource;
