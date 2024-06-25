import fs from "fs";
import path from "path";

const backupDir = path.resolve(__dirname, "../models_backup");
const newDir = path.resolve(__dirname, "../models");
const outputDir = path.resolve(__dirname, "../new_models");

const getFiles = (dir: string): string[] => {
  return fs.readdirSync(dir).filter((file) => fs.lstatSync(path.join(dir, file)).isFile());
};

const backupFiles = getFiles(backupDir);
const newFiles = getFiles(newDir);

const newModels = newFiles.filter((file) => !backupFiles.includes(file));

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

newModels.forEach((file) => {
  const srcPath = path.join(newDir, file);
  const destPath = path.join(outputDir, file);

  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`New model file copied: ${file}`);
  } catch (error) {
    console.error(`Error copying file ${file}:`, error);
  }
});
