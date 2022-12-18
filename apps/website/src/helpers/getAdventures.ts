import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const getAdventures = () => {
  const adventuresPath = path.join(process.cwd(), "../electron/hedy/content/adventures");
  const fileNames = fs.readdirSync(adventuresPath);
  const adventureFiles = fileNames.filter((fileName) => ["en", "nl"].includes(fileName.split(".")[0]));
  const data: any = {};
  adventureFiles.forEach((fileName) => {
    const code = fileName.split(".")[0];
    const filePath = path.join(adventuresPath, fileName);
    const buffer = fs.readFileSync(filePath);
    const content = buffer.toString();
    const adventure = yaml.load(content);
    data[code] = adventure;
  });
  return data as AdventureCollectionType;
};

export default getAdventures;
