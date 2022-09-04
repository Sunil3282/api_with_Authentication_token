const validator = require('fastest-validator');
const models =require('../models');

function save (req,res){
    const comment = {
        content: req.body.content,
        postId: req.body.postId,
        userId : 1
    }
    // for validation schema
    const schema = {
        content: {type:"string",optional:true,max:"50"},
        postId: {type:"number",optional:false}
    }
    const v = new validator();
    const validationResponse = v.validate(comment,schema);

    if(validationResponse !== true){
        res.status(400).json({
            massage:"Validation Failed!!",
            error: validationResponse
        })
    }
        
    models.Comment.create(comment).then(result =>{
        res.status(200).json({
            message: "Comment is created Successfully",
            result:result
        });
    }).catch(error =>{
        res.status(500).json({
            Message:"something went wrong!!",
            error:error
        })
    })
    

}
module.exports = {
    save:save,
}