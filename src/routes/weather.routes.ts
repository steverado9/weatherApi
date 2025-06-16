import { Router } from "express";
import WeatherController from "../controllers/weather.controller";

class WeatherRoutes {
    router = Router();
    weatherController = new WeatherController();
    city = this.weatherController.findCity;

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/",this.weatherController.createCityAndWeather);
        this.router.get(`/${this.city}`);
    }
}

export default new WeatherRoutes().router;