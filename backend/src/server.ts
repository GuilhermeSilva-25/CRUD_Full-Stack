import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import rotasApi from "./rotas.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const porta = 3000;

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "../../public")));

app.use("/api", rotasApi);

app.listen(porta, () => {
  console.log(`Servidor rodando e ouvindo na porta ${porta}`);
  console.log(`API disponível em: http://localhost:${porta}/api/usuarios`);
});