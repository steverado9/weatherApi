import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import data from "./db.config";
import City from "../models/city.model";
import Weather from "../models/weather.model";

class Database {

    public sequelize!: Sequelize;

    constructor() {
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        this.sequelize = new Sequelize({
            database: data.DB,
            username: data.USER,
            password: data.PASSWORD,
            host: data.HOST,
            dialect: data.dialect as Dialect,
            pool: {
                max: data.pool.max,
                min: data.pool.min,
                acquire: data.pool.acquire,
                idle: data.pool.idle
            },
            models: [City, Weather]
        });
        console.log("this.sequelize = >", this.sequelize);

        try {
            await this.sequelize.authenticate();
            //Drops all tables and re-creates them on every server start
            console.log("sync = >");
            await this.sequelize.sync({ force: true });
            console.log("connection has been established successfully");

            // Call seedCity after syncing
            await this.seedCity();
            await this.seedWeather();

        } catch (err) {
            console.error("Unable to connect to the database", (err as Error).message);
        }
    }
    //The database needs to have the city records available
    private async seedCity(): Promise<void> {
        try {
            const CityModel = this.sequelize.models.City as typeof City;

            const city = "Abuja";

            await CityModel.findOrCreate({
                where: { name: city },
                defaults: { id: 1, name: "Abuja" }
            });
            console.log("City table seeded.");
        } catch (err) {
            console.error("City Table Seeding failed:", (err as Error).message);
        }
    }

    //The database needs to have the weather records available
    private async seedWeather(): Promise<void> {
        try {
            const WeatherModel = this.sequelize.models.Weather as typeof Weather;

            await WeatherModel.findOrCreate({
                where: { main: "rainy" },
                defaults: {
                    id: 1,
                    main: "rainy",
                    description: "heavy rain",
                    cityId: 1
                }
            });
            console.log("Weather table seeded.");
        } catch (err) {
            console.error("Weather Table seeding failed:", (err as Error).message);
        }
    }
}

export default Database;