const express = require("express");

const createServer = () => {
  const app = express();

  app.get("/", () => {});
  app.get("/home", () => {});

  app.get("/api/users", () => {});
  app.get("/api/messages", () => {});
  app.get("/api/users/:user_id/messages", () => {});

  app.post("/api/users", () => {});
  app.post("/api/messages", () => {});

  app.patch("/api/users", () => {});
  app.patch("/api/messages", () => {});

  app.delete("/api/users", () => {});
  app.delete("/api/messages", () => {});

  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });

  return app;
};

module.exports = createServer;
