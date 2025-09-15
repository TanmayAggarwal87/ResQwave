import express from "express"
import { router } from "./routes/report.route.js";
import { connectDB } from "./libs/mongo.js";

const app = express();

app.use(express.json());

connectDB()
app.use("/reports", router);  // all routes in router will now start with /reports

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(3000, (req,res)=>{
    console.log("Running on 3000")
})