import express, { application, response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const server = express();
server.use(cors());
server.use(bodyParser.json());

const users = [];

const tweets = [];

server.post("/sign-up", (request, response) => {
  //console.log(request.body);
  //response.send("Ok");
  users.push({
    username: request.body.username,
    avatar: request.body.avatar,
  });
  console.log(users);
  response.send("OK");
});

server.listen(5000);
