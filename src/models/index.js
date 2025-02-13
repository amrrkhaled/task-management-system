import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import process from "process";
import configData from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configData[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

async function loadModels() {
  const modelFiles = fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");

  const modelImports = modelFiles.map(async (file) => {
    const modelModule = await import(path.join(__dirname, file));
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  await Promise.all(modelImports); 

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

await loadModels();

export default db;
