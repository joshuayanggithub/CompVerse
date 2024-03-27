const http = require("http");
const socket = require("./socket/socketInit");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// //configure environment variables
dotenv.config();

//connect to Atlas Server Database
let DB_Connection_String = process.env.DATABASE_STRING.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
DB_Connection_String = DB_Connection_String.replace("<DATABASE_NAME>", "db");
mongoose.connect(DB_Connection_String).then(() => {
  console.log("MongoDB connection succesful!");
});

const app = require("./app");
const server = http.createServer(app);

//initialize http server and mount socket.io instance on same port
const port = process.env.PORT || 3000;

socket.initSocketServer(server);

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
