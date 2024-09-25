import React, { useState } from 'react';
import api from '../Services/api';

function Reports() {
  const [reportDate, setReportDate] = useState('');

  const handleDownload = () => {
    if (!reportDate) {
      alert('Please select a date.');
      return;
    }

    api.get('/reports/daily', {
      params: { date: reportDate },
      responseType: 'blob',
    })
      .then(response => {
        // Create a download link
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'daily_report.pdf');
        document.body.appendChild(link);
        link.click();
        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading the report:', error);
        alert('Error downloading the report.');
      });
  };

  return (
    <div>
      <h1>Reports</h1>
      <div>
        <label>Report Date:</label>
        <input type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} />
      </div>
      <button onClick={handleDownload}>Download Daily Report</button>
    </div>
  );
}

export default Reports;
