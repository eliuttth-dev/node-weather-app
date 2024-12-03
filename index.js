#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import https from "https";
import health from "./logs/log.js";
import dotenv from "dotenv";

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

/**
* Configures the SkyShell CLI tool with its name, description and version.
*
* @name SkyShell
* @description A CLI tool that keeps your updated with your current location and weather.
* Includes a permanent mode to display updates every time the terminal opens.
*/

const program = new Command();

program
  .name("SkyShell")
  .description("CLI tool that keeps you updated with your current weather")
  .version("0.0.1")
  // Fetch city weather
  .option("-c, --city <city>", "Specify the city to search for weather")
  .action((option) => {
    if(option.city){
      console.log(chalk.green(`It's code here ${option.city}`));
      fetchWeather(option.city) 
    } else {
      console.log(chalk.red("You should provide a city name using --city or -c"))
    }    
  })

program.parse(process.argv);
