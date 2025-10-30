import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import releaseRoutes from "./routes/releases";
import authRoutes from "./routes/auth";
import imageRoutes from "./routes/upload";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use((req, _res, next) => {
  console.log("Origin: ", req.headers.origin);
  console.log("FRONTEND_URL", FRONTEND_URL)
  next();
})

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/releases", releaseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

app.get("/", (_req, res) => {
  res.send("running")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
