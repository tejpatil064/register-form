import express from "express"
import { Signup,GetUser, Login } from "../controllers/UserContorller.js";

const router = express.Router();

router.post("/signup",Signup)
router.post("/login",Login)
router.get("/getusers",GetUser)

export default router