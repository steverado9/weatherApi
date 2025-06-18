import axios from "axios"
import dotenv from "dotenv"

dotenv.config();


const getCityAndWeather =  async (city: string) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.error('Error fetching data:',  (err as Error).message)
    }
}


export default getCityAndWeather;