import express from "express"
import { update, del, get, sub, unsub, dislike, likes } from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()

// update user
router.put("/:id", verifyToken, update)

//delete user
router.delete("/:id", verifyToken, del)

// get a user
router.get("/find/:id", get)

// sub a user
router.put("/sub/:id", verifyToken, sub)

// unsub a user
router.put("/unsub/:id", verifyToken, unsub)

// likes a video
router.put("/like/:videoid", verifyToken, likes)

// dislike a video
router.put("/dislike/:videoid", verifyToken, dislike)


export default router