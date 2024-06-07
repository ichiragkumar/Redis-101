
import { createClient } from "redis"
const client =  createClient()






async function startWorker(){
            try {
              await  client.connect()
              while(true){
                try {
                    const response = await client.brPop("submissions",0)

                    console.log(response);
                    

                    // run the login to run the user code
                    // and think of , as of now it will take some of time 
                    // so , right now await it
                    await new Promise((resolve)=>{
                        setTimeout((resolve),1000)
                    })
                    // then send to pub/subs 
                    // and log the  value
                    console.log("processed user submissions");
                    
                } catch (error) {
                    console.error("Error processing submission:", error);
                    // Implement your error handling logic here. For example, you might want to push
                    // the submission back onto the queue or log the error to a file.

                    
                }
              }
            } catch (error) {
                console.error("Failed to connect to Redis", error);

                
            }
}


startWorker()