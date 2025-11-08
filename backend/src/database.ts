import mysql from "mysql2/promise";
import 'dotenv/config';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE) {
  console.error("ERRO: Variáveis de ambiente do banco de dados não estão definidas no .env");
  throw new Error("Configuração de banco de dados incompleta.");
}

const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
    .then(connection => {
        console.log("Banco de dados conectado com sucesso!");
        connection.release();
    })
    .catch(error => {
        console.error("Erro ao conectar com o banco de dados:", error);
    });

export default pool;