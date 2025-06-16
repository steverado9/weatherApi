import { Application } from "express";
import weatherRoutes from "./weather.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api/weather", weatherRoutes);
    }
}