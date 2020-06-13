const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.send('i am from index router');


});

module.exports=router;
