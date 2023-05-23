// Importing Package.
const router= require("express").Router();
const jwt=require('jsonwebtoken');

// @route GET /api/v1/testingtwt/
// @desc Base URL for JWT project
router.get('/',(req,res)=>{
    res.json({"message":"Testing JWT"})
});

// @route POST /api/v1/testingjwt/login
// @desc Login User and generate jwt token
router.post('/login',(req,res)=>{
    // Creating Mock user which will be available after authentication
    // on database. 
    user={
        id:1,
        username:'dev',
        email:"dev@test.com"
    }
    // jwt.sign({data to send}, 'any secret key ', callback function for aysnc )
    jwt.sign({user:user}, 'secretkey', (err,token)=>{
        res.json({token:token})
    });
})

//@route POST /api/v1/testingjwt/protectedroute
//@desc  Redirect to proper page after verifying the token
router.post('/protectedroute',verifyToken,(req,res)=>{
    // Asynchornous way to verify the jwt token
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if (err){
            res.sendStatus(403);
        }
        else{
            return res.json({
                "message":"Route under JWT protection",
                authData
            })
        }
    })
});

// FORMART OF token coming from request
// Authorization: Bearer <access_token>
// Verify Token Middleware function
function verifyToken(req,res,next){
    // Get auth header value
    const bearerHeader=req.headers['authorization'];
    // check if bearerHeader is undefined
    if (typeof(bearerHeader)!== 'undefined'){
        // Split bearerHeader
        const bearer=bearerHeader.split(' ');
        console.log(bearer[1]);
        // Accessing Token from bearer array
        const bearerToken= bearer[1];
        //set the Token
        req.token=bearerToken;
        //Next middleware
        next();
    }
    else{
        // Forbidden
        return res.sendStatus(403);
    }

}


module.exports = router;