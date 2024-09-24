// src/Components/Relatorios.jsx

import React, { useState } from 'react';
import api from '../Services/api';

function Relatorios() {
  const [dataRelatorio, setDataRelatorio] = useState('');

  const handleDownload = () => {
    if (!dataRelatorio) {
      alert('Por favor, selecione uma data.');
      return;
    }

    api.get('/relatorios/diario', {
      params: { data: dataRelatorio },
      responseType: 'blob',
    })
      .then(response => {
        // Cria um link para download
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'relatorio_diario.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('Erro ao baixar o relatório:', error);
        alert('Erro ao baixar o relatório.');
      });
  };

  return (
    <div>
      <h1>Relatórios</h1>
      <div>
        <label>Data do Relatório:</label>
        <input type="date" value={dataRelatorio} onChange={(e) => setDataRelatorio(e.target.value)} />
      </div>
      <button onClick={handleDownload}>Baixar Relatório Diário</button>
    </div>
  );
}

export default Relatorios;
