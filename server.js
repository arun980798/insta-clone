require('dotenv').config();//this add dotenv data 



const app = require("./src/app")
const connectodb = require("./src/config/database")





connectodb()//connec ther server 



app.listen(3000,()=>{
    console.log("server is runnging at 3000")
});
