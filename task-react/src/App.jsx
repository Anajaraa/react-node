import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import './App.css';






const API_URL = "http://localhost:5174/tarefas";

function App() {
    const [tarefas, setTarefas] = useState([]);
    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        fetchTarefas();
    }, []);

    const fetchTarefas = async () => {
        const res = await axios.get(API_URL);
        setTarefas(res.data);
    };

    const adicionarTarefa = async () => {
        if (!titulo) return;
        await axios.post(API_URL, { titulo, status: "pendente" });
        setTitulo("");
        fetchTarefas();
    };

    const excluirTarefa = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchTarefas();
    };

    const editarTarefa = async (id) => {
        const novoTitulo = prompt("Novo título da tarefa:");
        if (novoTitulo) {
            await axios.put(`${API_URL}/${id}`, { titulo: novoTitulo });
            fetchTarefas();
        }
    };

    const marcarConcluida = async (id, status) => {
        await axios.put(`${API_URL}/${id}`, { status: status === "pendente" ? "concluído" : "pendente" });
        fetchTarefas();
    };

    return (
        <Container className="container">
            <h1>Gerenciador de Tarefas</h1>
            <h2>Lista de Tarefas</h2>

            <Form className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Nova tarefa..."
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <Button className="btn-add mt-2" onClick={adicionarTarefa}>
                    Adicionar Tarefa
                </Button>
            </Form>

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
                            <td>
                                <Button className="btn-complete" onClick={() => marcarConcluida(tarefa.id, tarefa.status)}>
                                    {tarefa.status === "pendente" ? "Marcar Concluído" : "Reabrir"}
                                </Button>
                            </td>
                            <td>
                                <Button className="btn-edit" onClick={() => editarTarefa(tarefa.id)}>Editar</Button>
                                {' '}
                                <Button className="btn-delete" onClick={() => excluirTarefa(tarefa.id)}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default App;
