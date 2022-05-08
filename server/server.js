const app = require("./app.js");
const cloudinary = require("cloudinary");
const { connectDatabase } = require("./config/db/database");

const PORT = process.env.PORT || 6000;

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
  console.log(`Server Is Listening on Port Number ${PORT}`);
});
