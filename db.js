const mongoose = require("mongoose");
const mongoDBURI = process.env.NODE_ENV === "development" ? "mongodb://localhost:27017/mynotes" : `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.x9zys.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

async function createDbConnection() {
   try {
    await mongoose.connect(mongoDBURI);
    console.log("Connection established")
   } catch (error) {
    console.log(error.message)
   }
}

module.exports = {
    createDbConnection
};