const knex = require("knex")({
  client: "mysql2",
  connection: {
    // host: "192.168.3.229",
    // port: 3306,
    // user: "queue",
    // password: "aranFvg8zjkowfh",
    // database: "db_rm",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "db_rm",
  },
});

module.exports = knex