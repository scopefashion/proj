var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const client =new MongoClient('mongodb://localhost:27017/');
router.get('/create', async(req,res,next)=>{            //http://localhost:8888/testSession/create
    try{
        await client.connect();
        const db=client.db("testSession"); 
        const TSL = db.collection("Login");
        const users = [
        {
            username: 'Tony',
            password: 'TonyABC'
        },
        {
            username: 'Steve',
            password: 'Steve123'
        }]
        const dataWarehouse = await TSL.insertMany(users)
        console.log(dataWarehouse);
        res.send("Done testSession");
    }finally{
        await client.close()
    }
}).post('/Login', async(req,res,next)=>{
    try{
        await client.connect();
        const db=client.db("testSession"); 
        const TSL = db.collection("Login");
        console.log("aaa",req.body); 
        let data = await TSL.findOne({username:req.bosy.username});
        if (data.password === req.body.password) {
            res.send("Home")
        }else{
            res.send("fail")
        }
    }
    catch{

        }
        
    }finally{
        await client.close()
    }
)
module.exports = router;