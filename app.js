import dotenv from "dotenv"
dotenv.config();


import express from "express"
import cors from "cors"
import product from "./Routes/prod/product.js";
import connect from "./mongodb/connect.js";
import user from "./Routes/User/user.js";


connect();
const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3001', // your React app
    credentials: true               // if you're using cookies or auth headers
}));

app.use(express.json());

app.get("/",(req, res)=>{
    res.end("Hello first Express app");
});

app.use('/product', product)
app.use('/user', user);

app.listen(port, (req, res)=>{
    console.log("Server Running", port);
});