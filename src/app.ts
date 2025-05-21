import { initializeDatabase } from "@/models/Company";
import companyRoutes from "@/routes/companyRoutes";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", companyRoutes);

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
