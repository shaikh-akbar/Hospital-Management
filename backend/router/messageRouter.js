import express from "express"
import { getAllMessages, sendMessage } from "../controller/messageCtrl.js"
import { isAdminAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post("/send",sendMessage)
router.get("/admin/getAllMessages",isAdminAuthenticated,getAllMessages)

export default router