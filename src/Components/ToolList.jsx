// src/Components/ToolList.jsx

import React, { useEffect, useState } from 'react';
import { getTools, deleteTool } from '../Services/api';
import ToolForm from './ToolForm';
import styles from './ToolList.module.css'; // Opcional: criar arquivo de estilos

function ToolList() {
  const [tools, setTools] = useState([]);
  const [editingTool, setEditingTool] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTools = async () => {
    try {
      const response = await getTools();
      setTools(response.data);
    } catch (error) {
      console.error('Erro ao obter ferramentas:', error);
      alert('Erro ao obter ferramentas.');
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta ferramenta?')) {
      try {
        await deleteTool(id);
        fetchTools();
        alert('Ferramenta deletada com sucesso.');
      } catch (error) {
        console.error('Erro ao deletar ferramenta:', error);
        alert('Erro ao deletar ferramenta.');
      }
    }
  };

  const handleEdit = (tool) => {
    setEditingTool(tool);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingTool(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchTools();
  };

  return (
    <div className={styles.container}>
      <h2>Ferramentas</h2>
      <button onClick={handleAdd}>Adicionar Ferramenta</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id}>
              <td>{tool.id}</td>
              <td>{tool.name}</td>
              <td>{tool.category}</td>
              <td>
                <button onClick={() => handleEdit(tool)}>Editar</button>
                <button onClick={() => handleDelete(tool.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ToolForm tool={editingTool} onClose={handleFormClose} />
      )}
    </div>
  );
}

export default ToolList;
