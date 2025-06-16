import { Request, Response } from "express";
import City from "../models/city.model";
import Weather from "../models/weather.model";
import { Op } from "sequelize";

export default class WeatherController {
    //create a city and weather 
    async createCityAndWeather(req: Request, res: Response) {
        const { name, main, description } = req.body;
        if (!name) {
            res.status(400).json({ message: "city name required" });
            return;
        }
        try {
            const city = await City.create({ name });
            const weather = await Weather.create({ main, description });
            res.status(201).json({
                message: "city created sucessfully",
            })
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    //Find city
    async findCity(req: Request, res: Response) {

        try {
            const city = await City.findOne({ where: { name: req.body.name } });
            res.status(200).send({
                id: city!.id,
                name: city!.name
            })
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}