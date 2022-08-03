const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require("../model/db/conn");

const User = require("../model/schema");

const Admin = require("../model/schemaad");

const Exam = require("../model/question");

router.get('/',(req,res) =>{
    res.send("Hello, happy to see you back");
});


/*Read data from database*/
router.get('/collect/:category', async (req,res) =>{

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded){

        const {category} = req.params;

        console.log(category);

        const data = await Exam.find({category});

        if(data){
            return res.send(data);
        }
        else{
            return res.status(422).json({erroe:"Coundn't fetch data"});
        }
    }
});


/*Delete data route*/
router.delete('/delete/:id', async(req,res) =>{
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded){
        const role =decoded.role;
        if(role==='admin'){
            const {id} = req.params;

            console.log(req.body);

            const data = await Exam.findByIdAndDelete(id);

            if(data){
                return res.json({message:"Deleted the question"});
            }
            else{
                return res.status(422).json({error:"Coundn't delete"});
            }
        }
        else{
            return res.status(422).json({error:"Coundn't delete"});
        }
    }
    else{
        return res.status(422).json({error:"Coundn't delete"})
    }
});

/*Update*/
router.put('/update/:id', async(req,res) =>{
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded){

        const role = decoded.role;

        if(role==='admin'){
            const {id} = req.params;

            const {category,question,option0,option1,option2,option3,answer}=req.body;

            const option=[];

            option.push(option0);
            option.push(option1);
            option.push(option2);
            option.push(option3);

            const dat = await Exam.findByIdAndUpdate(id,{category,question,option,answer});
            
            if(dat){
                return res.json({message:"Updated the question"});
            }
            else{
                return res.status(422).json({error:"Coundn't update"})
            }
        }
        else{
            return res.status(422).json({error:"Coundn't update"})
        }
    }
    else{
        return res.status(422).json({error:"Coundn't update"})
    }
    
});

/*Insert new question*/
router.post('/insert',async (req,res) =>{

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded){
        const role = decoded.role;

        if(role==='admin'){
            const {category,question,option0,option1,option2,option3,answer}=req.body;

            const option=[];

            console.log(req.body);

            option.push(option0);
            option.push(option1);
            option.push(option2);
            option.push(option3);

            const exam = new Exam({category,question,option,answer});

            const add = await exam.save();

            if(add){
                return res.json({message:"Inserted new record"});
            }
            else{
                return res.status(422).json({error:"Coundn't insert a new question in the database"})
            }
        }
        else{
            return res.status(422).json({error:"Coundn't insert a new question in the database"})
        }
    }
    else{
        return res.status(422).json({error:"Coundn't insert a new question in the database"})
    }
});

/*Register Route*/
router.post('/register', async (req,res) =>{
    const {email,password,fname,lname}=req.body;

    let name = email;

    console.log(req.body);
    if(!name || !password){
        return res.status(422).json({error:"Failed to register"});
    }

    try{
        const userExist = await User.findOne({name:name});

        if(userExist){
            console.log(name);
            return res.status(422).json({error:"User already registered"});
        }

        const user = new User({name,fname,lname,password});

        const userRegister = await user.save();

        if(userRegister){
            return res.json({message:"User registered successfully"});
        }
    }
    catch{
        return res.status(422).json({error:"Failed to register"});
    }
});


/*Login route*/
router.post('/sign-in', async (req,res) =>{

    
    const {email,password}=req.body;

    let name = email;
    console.log(req.body)
    if(!name || !password){
        return res.status(422).json({error:"Failed to signin"});
    }

    try{
        const userPresent = await User.findOne({name:name});
        
        if(userPresent){
            const isPresent = await bcrypt.compare(password,userPresent.password);

            
            if(isPresent){
                const token = jwt.sign(
                    {
                      email:email,
                      role:"student"
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "5h" }
                );
                return res.json({token : token});
            }
            else{
                return res.status(422).json({error:"Invalid Credentials"});
            }
        }
        else{
            return res.status(422).json({error:"Invalid Credentials"});
        }
    }
    catch(err){
        console.log(err);
    }
})

/*signin admin*/
router.post('/sign-inad', async (req,res) =>{
    const {email,password}=req.body;

    let name = email;
    console.log(req.body)
    if(!name || !password){
        return res.status(422).json({error:"Failed to signin"});
    }

    try{
        const userPresent = await Admin.findOne({name:name});
        
        if(userPresent){
            const isPresent = await bcrypt.compare(password,userPresent.password);

            if(isPresent){
                const token = jwt.sign(
                    {
                      email:email,
                      role:"admin"
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "5h" }
                );
                return res.json({token : token});
            }
            else{
                return res.status(422).json({error:"Invalid Credentials"});
            }
        }
        else{
            return res.status(422).json({error:"Invalid Credentials"});
        }
    }
    catch(err){
        console.log(err);
    }
})

/*router.post('/registerp', async (req,res) =>{
    const {email,password,fname,lname}=req.body;

    let name = email;

    console.log(req.body);
    if(!name || !password){
        return res.status(422).json({error:"Failed to register"});
    }

    try{
        const userExist = await Parent.findOne({name:name});

        if(userExist){
            console.log(name);
            return res.status(422).json({error:"User already registered"});
        }

        const parent = new Parent({name,fname,lname,password});

        const userRegister = await parent.save();

        if(userRegister){
            return res.json({error:"User registered successfully"});
        }
    }
    catch{
        console.log("shr");
        return res.status(422).json({error:"Failed to register"});
    }
});


router.post('/sign-inp', async (req,res) =>{
    const {email,password}=req.body;

    let name = email;
    console.log(req.body)
    if(!name || !password){
        return res.status(422).json({error:"Failed to signin"});
    }

    try{
        const userPresent = await Parent.findOne({name:name});
        
        if(userPresent){
            const isPresent = await bcrypt.compare(password,userPresent.password);

            const token = await userPresent.generateAuthToken();

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+ 25892000000),
                httpOnly:true
            });
            if(isPresent){
                return res.json({message:"Signed-in successfully"});
            }
            else{
                return res.status(422).json({error:"Invalid Credentials"});
            }
        }
        else{
            return res.status(422).json({error:"Invalid Credentials"});
        }
    }
    catch(err){
        console.log(err);
    }
})

router.post('/sign-inow', async (req,res) =>{
    const {email,password}=req.body;

    let name = email;
    console.log(req.body)
    if(!name || !password){
        return res.status(422).json({error:"Failed to signin"});
    }

    try{
        const userPresent = await Owner.findOne({name:name});
        
        if(userPresent){
            const isPresent = await bcrypt.compare(password,userPresent.password);

            const token = await userPresent.generateAuthToken();

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+ 25892000000),
                httpOnly:true
            });
            if(isPresent){
                return res.json({message:"Signed-in successfully"});
            }
            else{
                console.log('sh');
                return res.status(422).json({error:"Invalid Credentials"});
            }
        }
        else{
            console.log('sh');
            return res.status(422).json({error:"Invalid Credentials"});
        }
    }
    catch(err){
        console.log(err);
    }
})
*/

module.exports = router;