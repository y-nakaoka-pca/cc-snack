/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Mike" },
  ]);

  await knex("messages").del();
  await knex("messages").insert([
    { id: 1, text: "Hello, Bob!", datetime: new Date(), from: 1, to: 2 },
    { id: 2, text: "Hi, Alice!", datetime: new Date(), from: 2, to: 1 },
  ]);
};
