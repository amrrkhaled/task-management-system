import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import db from "./models/index.js" // Ensure correct path to models


const app = express();



const corsOptions = {
  origin: "*", // Change this to your frontend's domain for better security
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

global.onlineUsers = new Map();
app.use(authRoutes);

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ alter: false }) // Change to `force: true` if you want to reset tables
  .then(() => {
    console.log("Database synchronized successfully.");
    app.listen(PORT, () => {
      const swaggerURL = `http://localhost:${PORT}/api-docs`;
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger Docs available at: ${swaggerURL}`);

      // setTimeout(() => {
      //   import("./workers/emailWorker.js")
      //     .then(() => console.log("Queue worker started"))
      //     .catch((err) => console.error("Failed to start queue worker:", err));
      // }, 5000); // Start after 5 seconds
   
   
   
    });
  })
  .catch((err) => console.error("Database sync failed:", err));
