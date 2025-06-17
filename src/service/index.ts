import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

const city = "london";

const getCityAndWeather =  async () => {
    try {
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
        console.log(data);
    } catch(err) {
        console.error('Error fetching data:',  (err as Error).message)
    }
}

getCityAndWeather();