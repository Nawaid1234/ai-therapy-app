import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "Chat route is working!" });
});

export default router;
