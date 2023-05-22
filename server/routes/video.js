import express from "express"
import { addV, updateV, deleteV, getV, addView, trend, random, subV, getByTag, search } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()

//creaet video
router.post("/", verifyToken, addV)
router.put("/:id", verifyToken, updateV)
router.delete("/:id", verifyToken, deleteV)
router.get("/find/:id", getV)

router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/subChan", verifyToken, subV)
router.get("/tags", getByTag)
router.get("/search", search)

export default router