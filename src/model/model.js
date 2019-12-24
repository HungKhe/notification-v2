const mongoose = require("mongoose");
const dbPath = "mongodb://localhost:27017/db_365";
mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});
module.exports = mongoose;