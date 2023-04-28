const router = require("express").Router();
const User = require("../models/User");
const bycrypt = require("bcrypt");



//UPDATE
router.post("/",async(req,res)=>{
    const newPost = new Post(req.body);
        try{
            const savedPost = await new Post.save()
            res.status(200).json(savedPost);

        }catch(err){
            res.status(500).json(err);
         }
       
});


//UPDATE POST
router.put("/:id",async(req,res)=>{
    
        try{
            const post = await Post.findById(req.params.id);
            if(post.username ===req.body.username){
                res.status(200).json(savedPost);
                try{
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true});
                res.status(200).json(updatedPost);
                }catch(err){
                    res.status(500).json(err);
                }   
            }else{
                res.status(401).json("you can update only your post")
            }

        }catch(err){
            res.status(500).json(err);
         }
       
});





//DELETE
router.delete("/:id",async(req,res)=>{
    
    try{
        const post = await Post.findById(req.params.id);
        if(post.username ===req.body.username){
            res.status(200).json(savedPost);
            try{
               await post.delete()
            res.status(200).json("post has been deleted");
            }catch(err){
                res.status(500).json(err);
            }   
        }else{
            res.status(401).json("you can delete only your post")
        }

    }catch(err){
        res.status(500).json(err);
     }
   
});

//GET POST
router.get("/:id", async (req,res)=>{
    try{
        const post = await User.findById(req.params.id);
        
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});

//GRT ALL POST
router.get("/", async (req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if (username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
         
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router

