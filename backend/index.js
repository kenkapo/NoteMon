import express from "express";
const app = express();
const port = 8080;
import AuthRouter from "./routes/Auth.js";
import NoteRouter from "./routes/Notes.js";
import mongoose from 'mongoose';
import cors from "cors";
import path from "path";
import {mongolink} from "../env.js"; 
const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,"/frontend/build")));
app.use(cors());

app.use(express.json());
 
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongolink);
  console.log("database connected");
}

app.use("/user",AuthRouter.router);
app.use("/note",NoteRouter.router);


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})   