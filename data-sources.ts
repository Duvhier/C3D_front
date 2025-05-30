import { DataSource } from "typeorm"
import { Book } from "./entity/Book"

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGODB_URI,
  database: "library_db",
  entities: [Book],
  synchronize: true,
  logging: true,
})
