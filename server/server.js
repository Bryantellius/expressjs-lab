const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
let app = express();
const characterPath = path.join(__dirname, "../character.json");

// app.get("/", (req, res) => {
//   res.send("Hello from the web server side...");
// });

// app.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.post("/submissions", (req, res) => {
  fs.writeFileSync("character.json", JSON.stringify(req.body));

  fs.readFile(characterPath, { encoding: "UTF-8" }, (err, data) => {
    if (err) console.log(err);
    let user = JSON.parse(data);
    res.send(`Welcome ${user.name} the ${user.character}!`);
  });
});

app.use(express.static(path.join(__dirname, "../public")));

app.listen(3000);
