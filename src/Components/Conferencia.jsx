// src/Components/Conferencia.jsx
import styles from './Conferencia.module.css';
import React, { useEffect, useState } from 'react';
import api from '../Services/api';

function Conferencia() {
  const [mecanicos, setMecanicos] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [selectedMecanico, setSelectedMecanico] = useState('');
  const [ferramentasPresentes, setFerramentasPresentes] = useState([]);
  const [categoriasVisiveis, setCategoriasVisiveis] = useState({});

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

  // Mostrar categorias
  const toggleCategoria = (categoria) => {
    setCategoriasVisiveis(prevState => ({
      ...prevState,
      [categoria]: !prevState[categoria],
    }));
  };

  // Organizar ferramentas por categoria
  const ferramentasPorCategoria = ferramentas.reduce((acc, ferramenta) => {
    const categoria = ferramenta.categoria;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(ferramenta);
    return acc;
  }, {});

  const handleFerramentaChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFerramentasPresentes([...ferramentasPresentes, value]);
    } 
    else {
      setFerramentasPresentes(ferramentasPresentes.filter(f => f !== value));
    }
  };

  const selecionarTodas = () => {
    const todasFerramentasIds = ferramentas.map(f => f.id.toString());
    setFerramentasPresentes(todasFerramentasIds);
  };
  
  const desmarcarTodas = () => {
    setFerramentasPresentes([]);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedMecanico) {
      alert('Por favor, selecione um mecânico.');
      return;
    }

    const data = {
      mecanico_id: parseInt(selectedMecanico),
      ferramentas_presentes: ferramentasPresentes.map(f => parseInt(f)),
    };

    api.post('/conferencia', data)
      .then(response => {
        alert('Conferência registrada com sucesso!');
        // Limpar seleção
        setSelectedMecanico('');
        setFerramentasPresentes([]);
      })
      .catch(error => {
        console.error('Erro ao registrar a conferência:', error);
        alert('Erro ao registrar a conferência.');
      });
  };

  return (
    <div className={styles.container}>
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
        <h2>Ferramentas Presentes:</h2>
        <div>
          <button type="button" onClick={selecionarTodas}>Selecionar Todas</button>
          <button type="button" onClick={desmarcarTodas}>Desmarcar Todas</button>
        </div>
        {Object.keys(ferramentasPorCategoria).map(categoria => (
          <div key={categoria} className={styles.category}>
            <h3 onClick={() => toggleCategoria(categoria)} style={{ cursor: 'pointer' }}>
              {categoria} {categoriasVisiveis[categoria] ? '▲' : '▼'}
            </h3>
            {categoriasVisiveis[categoria] && (
              <div>
                {ferramentasPorCategoria[categoria].map(ferramenta => (
                  <div key={ferramenta.id} className={styles['tool-item']}>
                    <label>
                      <input
                        type="checkbox"
                        value={ferramenta.id}
                        checked={ferramentasPresentes.includes(ferramenta.id.toString())}
                        onChange={handleFerramentaChange}
                      />
                      {ferramenta.nome}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button type="submit">Enviar Conferência</button>
      </form>
    </div>
  );
}

export default Conferencia;
