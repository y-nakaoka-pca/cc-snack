const express = require("express");
const db = require("../database/knex");

// TODO: ステータスコード
// TODO: バリデーション
// TODO: エラーハンドリング

const createserver = () => {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {});
  app.get("/home", (req, res) => {});

  app.get("/api/users", async (req, res) => {
    const result = await db.select().from("users");
    res.json(result);
  });

  app.get("/api/messages", async (req, res) => {
    const result = await db.select().from("messages");
    res.json(result);
  });
  app.get("/api/users/:user_id/messages", async (req, res) => {
    const { user_id } = req.params;
    const result = await db
      .select()
      .from("messages")
      .where("from", user_id)
      .orWhere("to", user_id);
    res.json(result);
  });

  app.post("/api/users", async (req, res) => {
    const body = req.body;
    const result = await db("users").insert(
      {
        name: body.name,
      },
      ["id", "name"]
    );

    res.json(result);
  });
  app.post("/api/messages", async (req, res) => {
    const body = req.body;
    const result = await db("messages").insert(
      {
        text: body.text,
        datetime: new Date(),
        from: body.from,
        to: body.to,
      },
      ["id", "text", "datetime", "from", "to"]
    );

    res.json(result);
  });

  app.patch("/api/users/:user_id", async (req, res) => {
    const { user_id } = req.params;
    const body = req.body;
    const result = await db("users").where({ id: user_id }).update(
      {
        name: body.name,
      },
      ["id", "name"]
    );

    res.json(result);
  });
  app.patch("/api/messages/:message_id", async (req, res) => {
    const { message_id } = req.params;
    const body = req.body;
    const result = await db("messages").where({ id: message_id }).update(
      {
        text: body.text,
      },
      ["id", "text", "datetime", "from", "to"]
    );

    res.json(result);
  });

  app.delete("/api/users/:user_id", async (req, res) => {
    const { user_id } = req.params;
    await db("users").where({ id: user_id }).delete();

    res.json();
  });
  app.delete("/api/messages/:message_id", async (req, res) => {
    const { message_id } = req.params;
    await db("messages").where({ id: message_id }).delete();

    res.json();
  });

  return app;
};

module.exports = createserver;
