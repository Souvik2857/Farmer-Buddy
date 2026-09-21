import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const processedAvatar = async (filePath) => {
  try {
    const absolutePath = path.resolve(filePath);
    const tempPath = absolutePath + ".tmp"; 

    await sharp(absolutePath)
      .resize({
        width: 300,
        height: 400,
        fit: "cover",
      })
      .toFile(tempPath);

    await fs.unlink(absolutePath);

    await fs.rename(tempPath, absolutePath);
    return absolutePath;

  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

export { processedAvatar };