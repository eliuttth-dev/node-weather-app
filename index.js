#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import health from "./logs/log.js";
import fetchWeather from "./api/fetchApi.js";

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
  .option("-c, --city <city>", "Specify the city to search for weather")
  .action((option) => {
    if(option.city){
      fetchWeather(option.city) 
    } else {
      console.log(chalk.red("You should provide a city name using --city or -c flag"))
      health("SYSTEM", "ERROR", "You should provide a city name using --city or -c flag");
    }    
  })

program.parse(process.argv);
