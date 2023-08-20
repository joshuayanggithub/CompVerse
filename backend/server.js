const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const socket = require("./socket/socket");
const dotenv = require("dotenv");

//configure environment variables
dotenv.config({ path: "./config.env" });

//initialize http server and mount socket.io instance on same port
const port = process.env.PORT || 3000;
socket.initSocketServer(server);

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
