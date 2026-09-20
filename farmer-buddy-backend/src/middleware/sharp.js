import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const processed = async (filePath) => {
  try {
    const absolutePath = path.resolve(filePath);
    const tempPath = absolutePath + ".tmp"; 

    await sharp(absolutePath)
      .resize({
        width: 300,
        height: 400,
        fit: "contain",
      })
      .toFile(tempPath);

    await fs.unlink(absolutePath);

    await fs.rename(tempPath, absolutePath);

    console.log("Image processed:", absolutePath);
    return absolutePath;

  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

export { processed };