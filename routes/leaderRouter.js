const express=require('express');
const bodyParser=require('body-parser');

const leaderRouter=require('../models/leader');

const leaderRoute=express.Router();

leaderRoute.use(bodyParser.json());

leaderRoute.route('/')
.get((req,res,next)=>{
    leaderRouter.find({}).then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err)).catch((err)=>next(err));
})
.post((req,res,next)=>{
    leaderRouter.create(req.body).then((leader)=>{
     res.statusCode=200;
     res.setHeader('Content-Type','application/json');
     res.json(leader);
    },(err)=>next(err)).catch((err)=>next(err))
})
.put((req,res,next)=>{
    res.send('this operation is not supported');
})
.delete((req,res,next)=>{
    leaderRouter.remove({}).then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err)).catch((err)=>next(err))
})
module.exports=leaderRoute;
