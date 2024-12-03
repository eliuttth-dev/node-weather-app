import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function health(type, message){
  const createdAt = new Date();
  const folderPath = path.join(__dirname, "./monitor");
  const filePath = path.join(__dirname, "./monitor/health.txt");
  
  // Check if folder and file data exists, if does not exists create a new one
  if(!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  if(!fs.existsSync(filePath)) fs.writeFileSync(filePath, "", "utf-8");
  
  // Write and re-write the log information
  if(filePath){
    const formatLogMessage = `TYPE: < ${type} > | MESSAGE: ${message} | REGISTERED: ${createdAt.toISOString()}\n`;
    
    // Get all the logs from the file
    const getLogHistory = fs.readFileSync(filePath, "utf-8", (err, data) => {
      if(err) console.error(err.message)
      return data;     
    })
    
    fs.writeFileSync(filePath, getLogHistory + formatLogMessage , "utf-8");
  }
}

export default health;


