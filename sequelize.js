import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/baza.db",
});

export { sequelize };