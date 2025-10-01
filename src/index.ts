import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import releaseRoutes from "./routes/releases";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/releases", releaseRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
