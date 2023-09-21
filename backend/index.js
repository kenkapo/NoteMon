import express from "express";
const app = express();
const port = 8080;
import AuthRouter from "./routes/Auth.js";
import NoteRouter from "./routes/Notes.js";
import mongoose from 'mongoose';
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config(); 

app.use(cors());

app.use(express.json());
 
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongolink);
  console.log("database connected");
}
const __dirname=path.resolve();
const above=path.resolve(__dirname,"..")
console.log(__dirname);
console.log(above);
app.use(express.static(path.join(above,"/frontend/build")));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(above,"frontend","build","index.html"));
})
app.use("/user",AuthRouter.router);
app.use("/note",NoteRouter.router);


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})   