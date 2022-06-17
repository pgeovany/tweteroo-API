import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (request, response) => {
  users.push({
    username: request.body.username,
    avatar: request.body.avatar,
  });
  response.send("OK");
});

server.post("/tweets", (request, response) => {
  const user = users.find((user) => user.username === request.body.username);
  tweets.unshift({
    username: user.username,
    avatar: user.avatar,
    tweet: request.body.tweet,
  });
  response.send("Ok");
});

server.get("/tweets", (request, response) => {
  response.send(tweets.slice(-10));
});

server.listen(5000);
