const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('fastest-validator');

function signUp (req,res){
    //findOne is inbuilt function of sequalize which help to check email

models.User.findOne({where:{email:req.body.email}}).then(result =>{
    if(result){
        res.status(409).json({
            massage:"Email is already present"
        });
    }else{
        const hash = bcryptjs.hashSync(req.body.password,10);
        const user = {
            name:req.body.name,
            email:req.body.email,
            password: hash,
        }
        //validarion schema
        const schema = {
            name:{type:"string",optional:false,max:"50"},
            email:{type:"string",optional:false,max:"50"},
            password:{type:"string",optional:false,}
        }
        const v = new validator();
        const validationResponse = v.validate(user,schema);
        if(validationResponse !== true){
            //400 bad request
            res.status(400).json({
                massage:"Validationfailed",
                error: validationResponse
            });
        }else{
            models.User.create(user).then(result =>{
                //201 success response
                res.status(201).json({
                    message:"User is created successfully",
                    result:result,
                });
            }).catch(error =>{
                res.status(500).json({
                    message:"Something went wrong!!",
                    error:error
                });
            });
        }
        
    }
    
}).catch(error =>{
    res.status(500).json({
        message:"Something went wrong!",
        error:error
    });
})
    
}

function login(req,res){
    models.User.findOne({where:{email:req.body.email}}).then(user =>{
//401 unauthorize
        if(user === null){
            res.status(401).json({
                massage:"Invalid Credentials!!"
            });
        }else{
            bcryptjs.compare(req.body.password,user.password,function(err,result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    },process.env.JWT_KEY, (err,token)=>{
                        res.status(200).json({
                            massage:"Authentication success",
                            "token":token,
                        });   
                    })
                }else{
                    res.status(401).json({
                        massage:"Invalid Credentials!!"
                    });
                }
            })
        }
    }).catch(error =>{
        res.status(500).json({
            message:"Something Went wrong!!"
        });
    });
}
module.exports = {
    signUp:signUp,
    login:login
}