const app = require("./app.js");
const { connectDatabase } = require("./config/db/database");

const PORT = process.env.PORT || 6000;

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server Is Listening on Port Number ${PORT}`);
});
