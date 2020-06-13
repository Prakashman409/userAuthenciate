const express=require('express');
const bodyParser=require('body-parser');
const promotion=require('../models/promotion');

const promoRouter=express.Router();
promoRouter.use(bodyParser.json());

console.log('i am from promorouter');


promoRouter.route('/')
.get((req,res,next)=>{
    promotion.find({}).then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion)
    },(err)=>next(err)).catch((err)=>next(err))
})
.post((req,res,next)=>{
    promotion.create(req.body).then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion)
    },(err)=>next(err)).catch((err)=>next(err));
})
.put((res,req,next)=>{
    res.send('not supported');
})
.delete((res,req,next)=>{
    promotion.remove({}).then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    },(err)=>next(err)).catch((err)=>next(err))
});

module.exports=promoRouter;