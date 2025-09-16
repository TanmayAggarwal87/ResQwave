import express from "express"
import  router  from "./routes/report.route.js";
import noticeRouter from "./routes/notice.route.js";
import { connectDB } from "./libs/mongo.js";
import cors from  "cors"
import dotenv from 'dotenv';


const app = express();

app.use(express.json());
dotenv.config();

connectDB()
app.use(
    cors({
      origin:[ "http://localhost:5173","exp://tq96vee-anonymous-8081.exp.direct","exp://127.0.0.1:8081"],
      credentials: true,
    })
  );

app.use("/reports", router);  // all routes in router will now start with /reports
app.use("/notices", noticeRouter); 

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(3000, (req,res)=>{
    console.log("Running on 3000")
})