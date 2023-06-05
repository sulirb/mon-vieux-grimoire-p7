const app = require("./app.js");

const http = require("http");

const port = process.env.PORT || 4000;
app.set("port", port);
const server = http.createServer(app);
server.on("listening", () => {
  const address = server.address();
  const bind =
    typeof address === "string"
      ? "pipe " + address
      : "http://localhost:" + port;
  console.log("listening on " + bind);
});

server.listen(port);
