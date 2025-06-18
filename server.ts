import express, { Application } from "express";
import dotenv from "dotenv";
import Server from "./src/index";
import Routes from "./src/routes";

dotenv.config();

const app: Application = express();

const server: Server = new Server(app);

const routes: Routes = new Routes(app);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen( PORT, "localhost", () => {
    console.log(`Server is listening on port ${PORT}.`)
})
.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use")
    } else {
        console.log(err);
    }
})

