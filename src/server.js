import express from "express";
import cors from "cors";
import router from "./routes/IndexRoute.js";




const server = express();
server.use(cors());
server.use(express.json());
server.use(router);





const port = process.env.SERVER_PORT;
server.listen(4000, () => console.log("Server is starting in port " + port));