import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

const API_URL = "http://localhost:5000/tarefas";

const TarefaList = () => {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        fetchTarefas();
    }, []);

    const fetchTarefas = async () => {
        const res = await axios.get(API_URL);
        setTarefas(res.data);
    };

    const excluirTarefa = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchTarefas();
    };

    return (
        <Container>
            <h2 className="my-4">Lista de Tarefas</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa) => (
                        <tr key={tarefa.id}>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.status}</td>
                            <td>
                                <Button variant="danger" onClick={() => excluirTarefa(tarefa.id)}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default TarefaList;
