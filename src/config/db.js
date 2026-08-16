import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "transaction_app",
  user: "samikshyakharel",
});
export default pool;
