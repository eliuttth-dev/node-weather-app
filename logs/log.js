import { fileURLToPath } from "url";
import fs from "fs";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

"ENOENT"
function health(type, message){
  const createdAt = new Date();
  const folderPath = path.join(__dirname, "/SkyShell/logs");
  const filePath = path.join(__dirname, "/SkyShell/logs/health.txt");
  
  // Check if folder and file data exists, if does not exists create a new one
  fs.exists(folderPath, (exist) => !exist ? fs.mkdirSync(folderPath, {recursive: true}): console.log("Folder found"));
  fs.exists(filePath, (exist) => !exist ? fs.writeFileSync(filePath, "", "utf-8"): console.log("File found")); 
  
  // Write and re-write the log information
  if(filePath){
    //info = "TYPE: ERROR | MESSAGE: CAN NOT GET THE API INFORMATION | TIME: 2024-12-02-0420z";
    const formatLogMessage = `TYPE: < ${type} > | MESSAGE: ${message} | REGISTERED: ${createdAt.toISOString()}\n`;
    
    // Get all the logs from the file
    const getLogHistory = fs.readFileSync(filePath, "utf-8", (err, data) => {
      if(err) console.error(err.message)
      return data;     
    })
    console.log(typeof getLogHistory)
    // This happends after read all the health.txt log file
    fs.writeFileSync(filePath, getLogHistory + formatLogMessage , "utf-8");
  }

}

export default health;


