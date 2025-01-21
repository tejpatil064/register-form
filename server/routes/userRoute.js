import express from "express";
import { Signup, GetUser, Login } from "../controllers/UserContorller.js";
import cors from "cors";

const router = express.Router();

router.use(
  cors({
    origin: "https://tejpatil-signup-form.vercel.app/",
    optionsSuccessStatus: 200,
  })
);

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/getusers", GetUser);

export default router;
