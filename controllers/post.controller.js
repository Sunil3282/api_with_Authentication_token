const validator = require('fastest-validator');
const models =require('../models');
function save(req,res){
    const post = {
        title:req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: 1 //we get from token
    }
    //validation schema
    const schema = {
        title:{type:"string",optional:false,max:"100"},
        content:{type:"string",optional:false,max:"500"},
        categoryId:{type:"number",optional:false}
    }
    // it return true or false
    const v = new validator()
    const validationResponse = v.validate(post,schema);
    

    if(validationResponse !== true){
        //400 bad request
        return res.status(400).json({
            message:"validation Failed!!",
            error: validationResponse
            
        });
    }

    models.Post.create(post).then(result =>{
        //200 for success
        res.status(200).json({
            message: "post is create successfully",
            result:result
        });
    }).catch(error =>{
        res.status(500).json({
            message:"Something went wrong!!",
            error:error
        })
    })
}
// to get single id imformation
function show(req,res){
     const id = req.params.id;
     //find by Primary Key
     models.Post.findByPk(id).then(result =>{
         if(result){
            res.status(200).json(result);
         }else{
             //404 not found
             res.status(404).json({
                 message:"Which is not exist"
             });
         }
        
     }).catch(error =>{
         message: "Something went Wrong!!";
         error:error
     })
}
// getting all the post that havebeing created
function index(req,res){
    models.Post.findAll().then(result =>{
        res.status(200).json(result);
    }).catch(error =>{
        // Internel server erroe
        res.status(500).json({
            message: "Something went wrong",
            error:error
        })
       
    })
}

// update the particular id post
function update(req,res){
    const id = req.params.id;
    const updatedPost = {
        title:req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
    }
    //validation schema
    const schema = {
        title:{type:"string",optional:false,max:"100"},
        content:{type:"string",optional:false,max:"500"},
        categoryId:{type:"number",optional:false}
    }
    // it return true or false
    const v = new validator()
    const validationResponse = v.validate(updatedPost,schema);
    if(validationResponse !== true){
        //400 bad request
        return res.status(400).json({
            message:"validation Failed!!",
            error: validationResponse
            
        });
    }
    
    const userId = 1;
    models.Post.update(updatedPost,{where:{id:id, userId:userId}}).then(result =>{
        res.status(200).json({
            message:"Successfully updated post",
            result:updatedPost

        });
    }).catch(error =>{
        res.status(500).json({
            message:"Something went wrong!!",
            error:error
        })
    })
   
}
// for deleting particular id post
function destroy(req,res){
    const id = req.params.id;
    const userId = 1;
    models.Post.destroy({where:{id:id,userId:userId}}).then(result =>{
        if(result){
            res.status(200).json({
                message:"Successfully deleted the post."
            });
        }else{
            //404 not found
            res.status(404).json({
                message:"Which is not exist"
            });
        }
        
    }).catch(error =>{
        res.status(500).json({
            message:"Something Went wrong",
            error:error
        });
       
    });

}
module.exports = {
    save:save,
    show:show,
    index:index,
    update:update,
    destroy:destroy

}