import { Request, Response } from "express";
import getCityAndWeather from "../service/index"

export default class CityController {

    findCity = async (req: Request, res: Response): Promise<void> => {
        try {
            const city = req.query.city as string;

            if (!city) {
                res.status(400).json({ error: "City query parameter is required" });
            }
            const response = await getCityAndWeather(city);

            res.status(200).json({
                message: "data fetched successfullly",
                city,
                data: response
            })
        } catch (err) {
            console.error("Error fetching weather:", (err as Error).message);
            res.status(500).json({ error: "Failed to fetch weather data" });
        }

    }

}