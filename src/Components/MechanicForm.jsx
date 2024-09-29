// src/Components/MechanicForm.jsx

import React, { useState, useEffect } from 'react';
import { createMechanic, updateMechanic } from '../Services/api';
import styles from './MechanicForm.module.css'; // Opcional: criar arquivo de estilos

function MechanicForm({ mechanic, onClose }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (mechanic) {
      setName(mechanic.name);
    } else {
      setName('');
    }
  }, [mechanic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Nome é obrigatório.');
      return;
    }

    try {
      if (mechanic) {
        // Atualizar
        await updateMechanic(mechanic.id, { name });
        alert('Mecânico atualizado com sucesso.');
      } else {
        // Criar
        await createMechanic({ name });
        alert('Mecânico criado com sucesso.');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar mecânico:', error);
      alert('Erro ao salvar mecânico.');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <h3>{mechanic ? 'Editar Mecânico' : 'Adicionar Mecânico'}</h3>
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
            <button type="submit">{mechanic ? 'Atualizar' : 'Adicionar'}</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MechanicForm;
