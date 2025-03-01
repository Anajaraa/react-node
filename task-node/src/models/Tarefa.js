import { DataTypes } from "sequelize";
import sequelize from "./index.js";
const Tarefa = sequelize.define("Tarefa", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM("pendente", "concluído"), defaultValue: "pendente" }
});

export default Tarefa;