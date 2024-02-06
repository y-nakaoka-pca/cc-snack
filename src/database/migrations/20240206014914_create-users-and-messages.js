/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
    })
    .createTable("messages", function (table) {
      table.increments("id");
      table.string("text", 1000).notNullable();
      table.datetime("datetime").notNullable();
      table.integer("from").notNullable();
      table.integer("to").notNullable();

      table.foreign("from").references("id").inTable("users");
      table.foreign("to").references("id").inTable("users");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("messages");
};
