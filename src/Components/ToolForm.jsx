// src/Components/ToolForm.jsx

import React, { useState, useEffect } from 'react';
import { createTool, updateTool } from '../Services/api';
import styles from './ToolForm.module.css'; // Opcional: criar arquivo de estilos

function ToolForm({ tool, onClose }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (tool) {
      setName(tool.name);
      setCategory(tool.category);
    } else {
      setName('');
      setCategory('');
    }
  }, [tool]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !category.trim()) {
      alert('Nome e categoria são obrigatórios.');
      return;
    }

    try {
      if (tool) {
        // Atualizar
        await updateTool(tool.id, { name, category });
        alert('Ferramenta atualizada com sucesso.');
      } else {
        // Criar
        await createTool({ name, category });
        alert('Ferramenta criada com sucesso.');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ferramenta:', error);
      alert('Erro ao salvar ferramenta.');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <h3>{tool ? 'Editar Ferramenta' : 'Adicionar Ferramenta'}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Categoria:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">{tool ? 'Atualizar' : 'Adicionar'}</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToolForm;
