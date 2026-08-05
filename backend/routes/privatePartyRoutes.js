import express from "express";
import PrivateParty from "../models/PrivateParty.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await PrivateParty.find({ status: true });
  res.json(data);
});

export default router;