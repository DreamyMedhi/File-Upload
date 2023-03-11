
const PORT=process.env.PORT||3000;
import { TestDB, FileDB } from "./file.js";
import connectDB from "./db.js";
import express from "express";
import busboy from 'busboy';// busboy wil divide the file into chunks  while sending it.
import fs from 'fs';//
const app=express();

app.use(express.json())
connectDB();



// app.get('/', async (req, res, next) => {
//     console.log('Express is working')
//     const mongodb = await conn()
//     res.send('Express is working')
// })

app.post('/', async (req, res, next) => {
    console.log(req.body)
    await TestDB.create(req.body)
    res.send('Saved in db')
})


app.post('/upload', (req, res) => {
  
    const bb = busboy({ headers: req.headers });
  
    bb.on('file', function(fieldname, file, info, encoding, mimetype) {
  
      file.pipe(fs.createWriteStream(info.filename)).on('finish', async () => {//will keep storing one by one chunks into the filestorage 
        //createWriteStream will keep collecting the chunks and will keep storing the local sys
        const temp = fs.readFileSync(info.filename)//will read and store temporarily.
        fs.unlinkSync(info.filename) //fs  will store the file in the local drive  and this line will delte it fom the local system

        await FileDB.create({name: info.filename, file: temp, author:"Dreamy"})
      })
    });
  
    bb.on('finish', function() {
      res.status(200).json({msg: 'File uploaded successfully to MongoDB'});
    });
  
    req.pipe(bb);
  });

app.get('/upload', async (req, res) => {
    const data = await FileDB.findOne()
    res.send(data)
})




app.listen(PORT,()=>{
    console.log('Server Started');  
});



// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


// const upload=multer({//here upload is a middleware
//     storage:multer.diskStorage({
//         destination:function(req,file,cb){
//             cb(null,"uploads")
//         },
//         filename:function(req,file,cb){
//             cb(null,file.fieldname+"-"+Date.now()+".txt")
//         }
//     })
// }).single("myfile");

// app.post("/upload",upload,(req,res)=>{
//     res.send("Upload successful");
// });



