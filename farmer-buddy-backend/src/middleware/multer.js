import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/temp"),
  filename: (req, file, cb) => {
    const cleanName = file.originalname
      .trim()
      .replace(/\s+/g, "-")              
      .replace(/[^a-zA-Z0-9.\-_]/g, ""); 

    cb(null, Date.now() + "-" + cleanName);
  },
});

export const upload = multer({ storage });