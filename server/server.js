import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectToDb from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js";

config();

const app = express();

app.use(
    cors({
      origin: function (origin, callback) {
        const allowedOrigins = [
          "http://localhost:5173",
          "https://task-manager-smoky-psi.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );


app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 4500;

const startServer = async () => {
  try {
    console.log("MONGO_URI exists?", !!process.env.MONGO_URI);
    console.log("JWT_SECRET exists?", !!process.env.JWT_SECRET);

    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

startServer();