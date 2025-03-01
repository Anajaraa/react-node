import express from "express";
import Tarefa from "../models/Tarefa.js";

const router = express.Router();

// Criar 
router.post("/", async (req, res) => {
    const { titulo, descricao, status } = req.body;
    const novaTarefa = await Tarefa.create({ titulo, descricao, status });
    res.json(novaTarefa);
});

router.get("/", async (req, res) => {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
});

// Atualizar 
router.put("/:id", async (req, res) => {
    const { titulo, descricao, status } = req.body;
    await Tarefa.update({ titulo, descricao, status }, { where: { id: req.params.id } });
    res.json({ message: "Tarefa atualizada!" });
});

// Excluir 
router.delete("/:id", async (req, res) => {
    await Tarefa.destroy({ where: { id: req.params.id } });
    res.json({ message: "Tarefa excluída!" });
});

export default router;
