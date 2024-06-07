import express from "express"
import { createClient } from "redis"


const clinet =  createClient()
const app = express()
app.use(express.json())


app.get("/", (req , res)=>{
    res.send("Every thing is fine ")
})


app.post("/submit", async (req, res)=>{
        const {problemId, userId, code, language}= await req.body

        try {
            // push this to database using prisma or mongoose

            clinet.lPush("submissions",JSON.stringify({problemId, userId, code, language}))
            res.status(201).json({msg:"submission recieve"})
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"serve error"})
            
        }

        

})
async function startServer(){

    try {
        await clinet.connect()
        console.log("connected to Redis");


        app.listen(3000, ()=>{
            console.log(`server is running at 3000`);
            
        })

    
    } catch (error) {
        console.log(error);
        
    }
    
}

startServer()

