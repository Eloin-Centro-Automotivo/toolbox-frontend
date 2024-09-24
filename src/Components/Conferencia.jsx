// src/Components/Conferencia.jsx
import styles from './Conferencia.module.css';
import React, { useEffect, useState } from 'react';
import api from '../Services/api';

function Conferencia() {
  const [mecanicos, setMecanicos] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [selectedMecanico, setSelectedMecanico] = useState('');
  const [ferramentasFaltantes, setFerramentasFaltantes] = useState([]);

  useEffect(() => {
    // Obter a lista de mecânicos
    api.get('/mecanicos').then(response => {
      setMecanicos(response.data);
    });

    // Obter a lista de ferramentas
    api.get('/ferramentas').then(response => {
      setFerramentas(response.data);
    });
  }, []);

  const handleFerramentaChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFerramentasFaltantes([...ferramentasFaltantes, value]);
    } 
    else {
      setFerramentasFaltantes(ferramentasFaltantes.filter(f => f !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedMecanico) {
      alert('Por favor, selecione um mecânico.');
      return;
    }

    const data = {
      mecanico_id: parseInt(selectedMecanico),
      ferramentas_faltantes: ferramentasFaltantes.map(f => parseInt(f)),
    };

    api.post('/conferencia', data)
      .then(response => {
        alert('Conferência registrada com sucesso!');
        // Limpar seleção
        setSelectedMecanico('');
        setFerramentasFaltantes([]);
      })
      .catch(error => {
        console.error('Erro ao registrar a conferência:', error);
        alert('Erro ao registrar a conferência.');
      });
  };

  return (
    <div>
      <h1>Conferência de Ferramentas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mecânico:</label>
          <select value={selectedMecanico} onChange={(e) => setSelectedMecanico(e.target.value)}>
            <option value="">Selecione um mecânico</option>
            {mecanicos.map(mecanico => (
              <option key={mecanico.id} value={mecanico.id}>{mecanico.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <h2>Ferramentas Faltantes:</h2>
          {ferramentas.map(ferramenta => (
            <div key={ferramenta.id}>
              <label>
                <input
                  type="checkbox"
                  value={ferramenta.id}
                  checked={ferramentasFaltantes.includes(ferramenta.id.toString())}
                  onChange={handleFerramentaChange}
                />
                {ferramenta.nome} ({ferramenta.categoria})
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Enviar Conferência</button>
      </form>
    </div>
  );
}

export default Conferencia;
