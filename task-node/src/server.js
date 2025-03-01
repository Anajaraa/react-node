import express from "express";
import cors from "cors";  // IMPORTAR O CORS AQUI
import dotenv from "dotenv";
import sequelize from "./models/index.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";

dotenv.config();
const app = express();

app.use(cors());  // ATIVAR O CORS AQUI
app.use(express.json());
app.use("/tarefas", tarefaRoutes);

sequelize.sync().then(() => {
    console.log("Banco sincronizado!");
    app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
});
