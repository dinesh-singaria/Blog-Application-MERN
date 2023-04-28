const router = require("express").Router();
const User = require("../models/User");
const bycrypt = require("bcrypt");



//UPDATE
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){
        if (req.body.password){
            const salt = await bycrypt.genSalt(10);
            req.body.password = bycrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.param.id,{
                $set: req.body,
            },{new:true});
            res.status(200).json(updatedUser);

        }catch(err){
            res.status(500).json(err);
         }
    }else{
        res.status(401).json("You can update only your account!");
    }     
});


//DELETE
router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){
       
        try{
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({username:user.username })
                await User.findByIdAndDelete(req.param.id);
                res.status(200).json("user has been deleted...");

            }catch(err){
               res.status(500).json(err);
            }

        }catch(err){
            res.status(500).json("User not Found!");
         }
    }else{
        res.status(401).json("You can update only your account!");
    }     
});

//GET USER
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router

