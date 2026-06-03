import express from "express";
import { config } from "dotenv";
import connectToDb from "./src/config/db.js";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js";

config();
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://task-manager-smoky-psi.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(process.env.PORT || 4500, () => {
      console.log("server started on PORT", process.env.PORT || 4500);
    });
  } catch (error) {
    console.log("error connecting to mongoDb", error);
  }
};

startServer();