import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import authRouter from "./routes/authRoute.js";
import adminroute from "./routes/adminRoute.js"
import productRouter from "./routes/productRoute.js"
import cors from "cors"
config()
const app = express()
app.use(express.json());
app.use(cors({
    // origin:"http://localhost:5173", 
    origin:"https://furnibreeze.vercel.app/", 
    

}))

const PORT =process.env.PORT||3000;

// database connect
const db = process.env.db
mongoose.connect(db)
.then(() => console.log("DB connected"))
.catch(error => console.log(error));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/users', authRouter);
app.use('/api/users', productRouter);

// app.use('/api/admin',adminroute);
app.use('/api/admin',adminroute);


app.listen(PORT,()=>{
    console.log("server is ready",PORT);
})
