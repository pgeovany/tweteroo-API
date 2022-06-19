import express, { request, response } from "express";
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
  if (!request.headers.user || !request.body.tweet) {
    response.status(400).send("Todos os campos são obrigatórios!");
  } else {
    const user = users.find((user) => user.username === request.headers.user);
    tweets.unshift({
      username: user.username,
      avatar: user.avatar,
      tweet: request.body.tweet,
    });
    response.status(201).send("OK");
  }
});

server.get("/tweets", (request, response) => {
  const page = parseInt(request.query.page);
  if (page === 0) {
    response.status(400).send("Informe uma página válida!");
  } else {
    const startingIndex = (page - 1) * 10;
    response.send(tweets.slice(startingIndex, page * 10));
  }
});

server.get("/tweets/:username", (request, response) => {
  const user = request.params.username;
  const userTweets = tweets.filter((tweet) => tweet.username === user);
  response.send(userTweets);
});

function isValidURL(url) {
  let regEx =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return regEx.test(url);
}

server.listen(5000);
