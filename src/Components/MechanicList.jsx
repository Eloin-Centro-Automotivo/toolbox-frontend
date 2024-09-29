// src/Components/MechanicList.jsx

import React, { useEffect, useState } from 'react';
import { getMechanics, deleteMechanic } from '../Services/api';
import MechanicForm from './MechanicForm';
import styles from './MechanicList.module.css'; // Opcional: criar arquivo de estilos

function MechanicList() {
  const [mechanics, setMechanics] = useState([]);
  const [editingMechanic, setEditingMechanic] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMechanics = async () => {
    try {
      const response = await getMechanics();
      setMechanics(response.data);
    } catch (error) {
      console.error('Erro ao obter mecânicos:', error);
      alert('Erro ao obter mecânicos.');
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este mecânico?')) {
      try {
        await deleteMechanic(id);
        fetchMechanics();
        alert('Mecânico deletado com sucesso.');
      } catch (error) {
        console.error('Erro ao deletar mecânico:', error);
        alert('Erro ao deletar mecânico.');
      }
    }
  };

  const handleEdit = (mechanic) => {
    setEditingMechanic(mechanic);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingMechanic(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchMechanics();
  };

  return (
    <div className={styles.container}>
      <h2>Mecânicos</h2>
      <button onClick={handleAdd}>Adicionar Mecânico</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {mechanics.map((mechanic) => (
            <tr key={mechanic.id}>
              <td>{mechanic.id}</td>
              <td>{mechanic.name}</td>
              <td>
                <button onClick={() => handleEdit(mechanic)}>Editar</button>
                <button onClick={() => handleDelete(mechanic.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <MechanicForm mechanic={editingMechanic} onClose={handleFormClose} />
      )}
    </div>
  );
}

export default MechanicList;
