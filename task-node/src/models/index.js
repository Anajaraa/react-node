import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql", // Adicionado o dialeto do MySQL
        logging: false, // Desativa logs no console (opcional)
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Banco de dados conectado!");
    } catch (error) {
        console.error("Erro ao conectar ao banco:", error);
    }
}

connectDB(); // Chama a função para testar a conexão

export default sequelize;
