const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const createserver = require("../src/server/server");
chai.should();

const server = createserver();

describe("snack serverのテスト", () => {
  let request;
  let testUser;
  let testMessage;

  beforeEach(() => {
    request = chai.request(server);
  });

  it("GET /", async () => {
    const res = await request.get("/");
    res.should.be.html;
  });

  it("GET /home/:from_user_id/:to_user_id", async () => {
    const res = await request.get("/home/1/1");
    res.should.be.html;
  });

  it("GET /api/users", async () => {
    const res = await request.get("/api/users");
    res.should.be.json;
    console.log(JSON.parse(res.text));
  });

  it("GET /api/messages", async () => {
    const res = await request.get("/api/messages");
    res.should.be.json;
    console.log(JSON.parse(res.text));
  });

  it("POST /api/users", async () => {
    const res = await request.post("/api/users").send({ name: "testUser" });
    res.should.be.json;
    JSON.parse(res.text).name.should.equal("testUser");
    testUser = JSON.parse(res.text);
  });

  it("POST /api/messages", async () => {
    const res = await request
      .post("/api/messages")
      .send({ text: "testMessage", from: testUser.id, to: testUser.id });
    res.should.be.json;
    JSON.parse(res.text).text.should.equal("testMessage");
    testMessage = JSON.parse(res.text);
  });

  it("PATCH /api/users/:user_id", async () => {
    const res = await request
      .patch(`/api/users/${testUser.id}`)
      .send({ name: "testUser2" });
    res.should.be.json;
    JSON.parse(res.text).name.should.equal("testUser2");
  });

  it("PATCH /api/messages/:message_id", async () => {
    const res = await request
      .patch(`/api/messages/${testMessage.id}`)
      .send({ text: "testMessage2" });
    res.should.be.json;
    JSON.parse(res.text).text.should.equal("testMessage2");
  });

  // 外部キー制約のためメッセージから削除する
  it("DELETE /api/messages/:message_id", async () => {
    const res = await request.delete(`/api/messages/${testMessage.id}`);
    res.should.be.json;
  });

  it("DELETE /api/users/:user_id", async () => {
    const res = await request.delete(`/api/users/${testUser.id}`);
    res.should.be.json;
  });
});
