import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addV = async (req, res, next) => {
    const newV = new Video({
        userId: req.user.id, ...req.body
    })
    try{
        const saveV = await newV.save()
        res.status(200).json(saveV)
    }catch(err){
        next(err)
    }
}

export const updateV = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "video not found"))
        if(req.user.id === video.userId){
            const updatedV = await Video.findByIdAndUpdate(
                req.params.id, {
                    $set:req.body
                },
                {
                    new: true
                }
            )
            res.status(200).json(updatedV)
        } 
        else{
            return next(createError(403, "You only update your video"))
        }
    }catch(err){
        next(err)
    }
}

export const deleteV = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "video not found"))
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(
                req.params.id)
            res.status(200).json("vIDEO DELETE")
        } 
        else{
            return next(createError(403, "You only update your video"))
        }
    }catch(err){
        next(err)
    }
}

export const getV = async (req, res, next) => {
    try{
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    }catch(err){
        next(err)
    }
}

export const addView = async (req, res, next) => {
    try{
        const video = await Video.findByIdAndUpdate(req.params.id,{
            $inc: {views:1}
        })
        res.status(200).json("The views incs")
    }catch(err){
        next(err)
    }
}

export const random = async (req, res, next) => {
    try{
        const video = await Video.aggregate([{$sample:{size: 40}}])
        res.status(200).json(video)
    }catch(err){
        next(err)
    }
}

export const trend = async (req, res, next) => {
    try{
        const videos = await Video.find().sort({views: -1})
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}

export const subV = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id)
        const subChan = user.subscribedUsers;
        const list = await Promise.all(
            subChan.map((channelId) => {
                return Video.find({ userId: channelId})
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    }catch(err){
        next(err)
    }
}

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    console.log(tags)
    try{
        const videos = await Video.find({tags:{$in: tags}}).limit(20);
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}


export const search = async (req, res, next) => {
    const query = req.query.q
    try{
        const videos = await Video.find({title: {$regex: query, $options:"i"}}).limit(40)
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}