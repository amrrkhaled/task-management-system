const express = require("express");
const cors = require("cors");
const db = require("./models"); // Import models (Sequelize)

const app = express();
app.use(cors());
app.use(express.json());

// const taskRoutes = require("./routes/taskRoutes");
// app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
db.sequelize.sync({ alter: true }) // Change to `force: true` if you want to reset tables
  .then(() => {
    console.log("Database synchronized successfully.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database sync failed:", err));


