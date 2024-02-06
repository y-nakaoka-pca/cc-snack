const express = require("express");
const path = require("path");
const db = require("../database/knex");

// TODO: ステータスコード
// TODO: バリデーション
// TODO: エラーハンドリング

const createserver = () => {
  const app = express();
  app.use(express.json());

  app.use("/", express.static(path.join(__dirname, "../front/login")));
  app.use(
    "/home/:from_user_id/:to_user_id",
    express.static(path.join(__dirname, "../front/home"))
  );

  app.get("/api/users", async (req, res) => {
    const result = await db.select().from("users");
    res.json(result);
  });

  app.get("/api/messages", async (req, res) => {
    const { from, to } = req.query;
    // TODO: 良い書き方ありそう
    if (from && to) {
      result = await db
        .select()
        .from("messages")
        .where("from", from)
        .andWhere("to", to);
    } else if (from) {
      result = await db.select().from("messages").where("from", from);
    } else if (to) {
      result = await db.select().from("messages").where("to", to);
    } else {
      result = await db.select().from("messages");
    }

    res.json(result);
  });

  // app.get("/api/users/:user_id/messages", async (req, res) => {
  //   const { user_id } = req.params;
  //   const result = await db
  //     .select()
  //     .from("messages")
  //     .where("from", user_id)
  //     .orWhere("to", user_id);
  //   res.json(result);
  // });

  app.post("/api/users", async (req, res) => {
    const { name } = req.body;
    const result = await db("users").insert(
      {
        name,
      },
      ["id", "name"]
    );

    res.json(result);
  });
  app.post("/api/messages", async (req, res) => {
    const { text, from, to } = req.body;
    const result = await db("messages").insert(
      {
        text,
        datetime: new Date(),
        from,
        to,
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
