const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname)))

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
   origin: "http://localhost:3000"
   }
});
 

// client baglantısı olduğunda çalışacak !
io.on("connection", (client) => {
  console.log("a user connected", client.id);


  // gelen clienti istediği room'a ekleme 
  client.on("join_room", (data) => {
    client.join(data);
    console.log(`User with ID: ${client.id} joined room: ${data}`);
  });


  // room da bulunan clientlere mesaj gönderme
  client.on("chat", (data) => {
    client.to(data.room).emit("receive_message", data);

  });


  // client baglantı kontrolü
  client.on("disconnect", () => {
    console.log("User Disconnected", client.id);
  });
});
const host = '52.91.52.133'
const port = 3001;

server.listen(port,() => {
  console.log(`Server Running at ${port}`);
});
