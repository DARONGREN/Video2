import express from "express"
import { addCom, deleteCom, getCom } from "../controllers/comment.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()

router.post("/", verifyToken, addCom)
router.delete("/:id", verifyToken, deleteCom)
router.get("/:videoId", getCom)

export default router