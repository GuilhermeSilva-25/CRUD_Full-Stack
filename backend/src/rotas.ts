import { Router } from "express";
import type { Request, Response } from "express";
import { EstudanteDAO } from "./estudantesDAO.js";

const router = Router();
const dao = new EstudanteDAO();

router.get("/usuarios", async (req: Request, res: Response) => {
  try {
    const usuarios = await dao.getAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro na rota GET /usuarios:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

router.get("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID não fornecido." });
    }

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const usuario = await dao.getById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro na rota GET /usuarios/:id:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

router.post("/usuarios", async (req: Request, res: Response) => {
  try {
    const { nome, email } = req.body as { nome: string; email: string };

    if (!nome || !email) {
      return res
        .status(400)
        .json({ message: "Nome e email são obrigatórios." });
    }

    const novoUsuario = await dao.create(nome, email);
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro na rota POST /usuarios:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

router.put("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID não fornecido." });
    }

    const id = parseInt(req.params.id);
    const { nome, email } = req.body as { nome: string; email: string };

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }
    if (!nome || !email) {
      return res
        .status(400)
        .json({ message: "Nome e email são obrigatórios." });
    }

    const linhasAfetadas = await dao.update(id, nome, email);
    if (linhasAfetadas === 0) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado para atualizar." });
    }

    res.status(200).json({ id, nome, email });
  } catch (error) {
    console.error("Erro na rota PUT /usuarios/:id:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

router.delete("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID não fornecido." });
    }

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const linhasAfetadas = await dao.delete(id);
    if (linhasAfetadas === 0) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado para deletar." });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Erro na rota DELETE /usuarios/:id:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

export default router;