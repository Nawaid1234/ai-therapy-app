import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";  // Ensure correct path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Important for parsing JSON

app.use("/chat", chatRoutes);  // Ensure this matches Postman request

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
