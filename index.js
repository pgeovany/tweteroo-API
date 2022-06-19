import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (request, response) => {
  if (!request.body.username || !isValidURL(request.body.avatar)) {
    response.status(400).send("Todos os campos são obrigatórios!");
  } else {
    users.push({
      username: request.body.username,
      avatar: request.body.avatar,
    });
    response.status(201).send("OK");
  }
});

server.post("/tweets", (request, response) => {
  if (!request.body.username.length || !request.body.tweet.length) {
    response.status(400).send("Todos os campos são obrigatórios!");
  } else {
    const user = users.find((user) => user.username === request.body.username);
    tweets.unshift({
      username: user.username,
      avatar: user.avatar,
      tweet: request.body.tweet,
    });
    response.status(201).send("OK");
  }
});

server.get("/tweets", (request, response) => {
  response.send(tweets.slice(-10));
});

function isValidURL(url) {
  let regEx =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return regEx.test(url);
}

server.listen(5000);
