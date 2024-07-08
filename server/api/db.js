const dotenv = require("dotenv").config();
const { Pool }  = require("pg")
module.exports = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: {
      require: true,
    },
});