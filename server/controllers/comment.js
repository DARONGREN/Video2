import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addCom = async (req, res, next) =>{
    const newCom = new Comment({
        ...req.body, userId: req.user.id
    })
    try{
        const saveCom = await newCom.save()
        res.status(200).send(saveCom)
    }catch(err){
        next(err)
    }
}

export const deleteCom = async (req, res, next) =>{
    try{
        const comment = await Comment.findById(res.params.id)
        const video = await Video.findById(res.params.id)
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("the comment has deleted")
        }
        else{
            return next(createError(403, "you can only delte your comment"))
        }
    }catch(err){
        next(err)
    }
}

export const getCom = async (req, res, next) =>{
    try{    
        const comment = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comment)
    }catch(err){
        next(err)
    }
}