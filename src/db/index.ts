import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import data from "./db.config";
import City from "../models/city.model";
import Weather from "../models/weather.model";

class Database {
    public sequelize: Sequelize | undefined;

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
        try {
            await this.sequelize.authenticate();
            //Drops all tables and re-creates them on every server start
            await this.sequelize.sync({ force: true });
            console.log("connection has been established successfully");
        } catch (err) {
            console.error("Unable to connect to the database");
        }
    }
}

export default Database;