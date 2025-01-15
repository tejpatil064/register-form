import express from "express"
import { Signup,GetUser } from "../controllers/UserContorller.js";

const router = express.Router();

router.post("/signup",Signup)
router.get("/getusers",GetUser)

export default router