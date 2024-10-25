import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const username = req.body["username"];
  const password = req.body["password"];
  if (username === "Programming" && password === "LoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}

app.get("/", (req, res) => {
  res.redirect(_dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.redirect(_dirname + "/public/secret.html");
  } else {
    res.redirect(_dirname + "/public/index.html");
  }
});

app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
