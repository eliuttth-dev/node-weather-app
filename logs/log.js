import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/**
* Logs a message to a 'health.txt' file within a 'monitor' directory
*
* Ensures that the folder and file exist, if not, create them
* and appends a log entry with a specified type, message and timestamp
*
* @function health
* @param {string} type - Type of operation that has been made (e.g. "API CALL", "DEBUG", "SYSTEM", etc)
* @param {string} status - The type or category of the log message ("INFO", "ERROR", "SUCCESS", "WARNING", etc)
* @param {string} message - The log message to be record
*
* @example
* health("API CALL", "WARNING", "You are not suscribed to this API");
*
* @example
* health("SYSTEM", "INFO", "Folder <name> has been created")
*/
function health(type, status, message){
  const createdAt = new Date();
  const folderPath = path.join(__dirname, "./monitor");
  const filePath = path.join(__dirname, "./monitor/health.txt");
  
  // Check if folder and file data exists, if does not exists create a new one
  if(!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  if(!fs.existsSync(filePath)) fs.writeFileSync(filePath, "", "utf-8");
  
  // Write and re-write the log information
  if(filePath){
    const formatLogMessage = `TYPE: < ${type} > | STATUS: < ${status} > | MESSAGE: ${message} | REGISTERED: ${createdAt.toISOString()}\n`;
    
    // Get all the logs from the file
    const getLogHistory = fs.readFileSync(filePath, "utf-8")
    
    fs.writeFileSync(filePath, getLogHistory + formatLogMessage , "utf-8");
  }
}

export default health;


