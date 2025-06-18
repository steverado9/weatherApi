import { Router } from "express";
import CityController from "../controllers/city.controller";

class CityRoutes {
    router = Router();
    cityController = new CityController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.cityController.findCity);
    }
}

export default new CityRoutes().router;
