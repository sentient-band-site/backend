import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import releaseRoutes from "./routes/releases";
import authRoutes from "./routes/auth";
// import { authenticateToken } from "./middleware/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/releases", releaseRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send("running")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
