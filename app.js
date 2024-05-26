const express = require("express");
const cors = require("cors");
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);
app.use(cors());
app.use(express.json());
const axios = require('axios');
const authenticator = require("./utils/Authenticator");
const register = require("./utils/Register");
let message = "hello";
let data2 = [{Starttime: '10:30:00',
Endtime: '12:00:00',
motorused: 'motor1'}]
io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on("identify", (clientType) => {
        console.log(`Client type: ${clientType}`);
        if (clientType === "app") {
          // Handle app-specific logic
          socket.emit("message", "Welcome to the WebSocket server!");
        } else {
          // Handle other clients (e.g., Expo tools)
          console.log("Connected by a non-app client");
        }
      });
    // Send the initial table to the connected client
    socket.emit('message', data2);
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
// app.post("/", async (req, res) => {
//     authenticator(req);
//     try {
//         const response = await axios.get('http://localhost:8004');
//         res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error occurred while making API call');
//     }
// });
app.post("/register",register);
app.post("/authenticate",authenticator);

module.exports = server;
