import { Application } from "express";
import cityRoute from "./city.route";


export default class Routes {
    constructor(app: Application) {
        app.use(`/api/weather`, cityRoute);
    }
}