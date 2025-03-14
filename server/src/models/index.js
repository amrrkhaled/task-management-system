import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";
import process from "process";
import configData from "../config/config.js";
import associateModels from "./associations.js"; // ✅ Import associations separately

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
    .filter((file) => file.endsWith(".js") && file !== basename && file !== "associations.js");

  const modelPromises = modelFiles.map(async (file) => {
    try {
      const modelPath = pathToFileURL(path.join(__dirname, file)).href;
      const modelModule = await import(modelPath);

      if (typeof modelModule.default === "function") {
        const model = modelModule.default(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      } else {
        console.warn(`⚠️ Warning: ${file} does not export a valid model function.`);
      }
    } catch (error) {
      console.error(`❌ Error loading model ${file}:`, error);
    }
  });

  await Promise.allSettled(modelPromises); // ✅ Ensures all models are loaded before moving on

  associateModels(db); // ✅ Apply associations properly after models are loaded

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

await loadModels();

export default db;
