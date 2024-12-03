import dotenv from "dotenv";
import https from "https";
import health from "../logs/log.js";
import chalk from "chalk"

dotenv.config(); 

// API INFO
const options = (city, language) => {
  return {
    method: "GET",
    hostname: "open-weather13.p.rapidapi.com",
    port: null,
    path: `/city/${city}/EN`,
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "open-weather13.p.rapidapi.com"
    }
  }
}

function fetchWeather(city){
  const req = https.request(options(city), (res) => {
      const chunks = [];

      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks);
        const weatherData = JSON.parse(body.toString());

        if(weatherData && weatherData.main && weatherData.main.temp){
          const celciusTemp = (weatherData.main.temp - 32) * 5/9; 
          health("API CALL", "SUCCESS", `The temperature in ${city} is ${celciusTemp.toFixed(2)} Celcius`);
          console.log(chalk.green(`The temperature in ${city} is ${celciusTemp.toFixed(2)} Celcius`));
        } else {
          health("API CALL", "ERROR", "You are not suscribed to this API")
          console.log(chalk.red("Weather data is not available"));
        }
      });
  });

  req.on("error",(e) => console.log(chalk.red(`Error fetching weather data: ${e.message}`)));
  req.end();
}

export default fetchWeather;
