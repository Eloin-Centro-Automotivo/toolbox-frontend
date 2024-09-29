// src/Components/MissingToolsReport.jsx

import React, { useState } from 'react';
import { getMissingToolsReport } from '../Services/api';
import styles from './MissingToolsReport.module.css';
import api from '../Services/api';

function MissingToolsReport() {
  const [reportDate, setReportDate] = useState('');
  const [missingTools, setMissingTools] = useState([]);

  const handleGenerateReport = async () => {
    if (!reportDate) {
      alert('Por favor, selecione uma data.');
      return;
    }

    try {
      const response = await getMissingToolsReport(reportDate);
      setMissingTools(response.data);
    } catch (error) {
      console.error('Erro ao obter o relatório:', error);
      alert('Erro ao obter o relatório. Verifique se o back-end está rodando e tente novamente.');
    }
  };

  const handleDownloadPDF = async () => {
    if (!reportDate) {
      alert('Por favor, selecione uma data.');
      return;
    }
  
    try {
      const response = await api.get('/reports/missing_tools/pdf', {
        params: { date: reportDate },
        responseType: 'blob',
      });
  
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'relatorio-ferramentas-faltantes.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar o relatório:', error);
      alert('Erro ao baixar o relatório.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Relatório de Ferramentas Faltantes Únicas</h1>
      <div>
        <label>Data do Relatório:</label>
        <input
          type="date"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
        />
        <button onClick={handleDownloadPDF}>Baixar Relatório em PDF</button>
      </div>
    </div>
  );
}

export default MissingToolsReport;
