import styles from './Conference.module.css';
import React, { useEffect, useState } from 'react';
import api from '../Services/api';

function Conference() {
  const [mechanics, setMechanics] = useState([]);
  const [tools, setTools] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [presentTools, setPresentTools] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState({});

  useEffect(() => {
    // Fetch the list of mechanics
    api.get('/mechanics').then(response => {
      setMechanics(response.data);
    });

    // Fetch the list of tools
    api.get('/tools').then(response => {
      setTools(response.data);
    });
  }, []);

  // Toggle category visibility
  const toggleCategory = (category) => {
    setVisibleCategories(prevState => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  // Organize tools by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    const category = tool.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {});

  const handleToolChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPresentTools([...presentTools, value]);
    } 
    else {
      setPresentTools(presentTools.filter(f => f !== value));
    }
  };

  const selectAll = () => {
    const allToolIds = tools.map(t => t.id.toString());
    setPresentTools(allToolIds);
  };
  
  const deselectAll = () => {
    setPresentTools([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedMechanic) {
      alert('Please select a mechanic.');
      return;
    }

    const data = {
      mechanic_id: parseInt(selectedMechanic),
      present_tools: presentTools.map(f => parseInt(f)),
    };

    api.post('/conference', data)
      .then(response => {
        alert('Conference successfully recorded!');
        // Clear selections
        setSelectedMechanic('');
        setPresentTools([]);
      })
      .catch(error => {
        console.error('Error recording conference:', error);
        alert('Error recording the conference.');
      });
  };

  return (
    <div className={styles.container}>
      <h1>Tool Conference</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mechanic:</label>
          <select value={selectedMechanic} onChange={(e) => setSelectedMechanic(e.target.value)}>
            <option value="">Select a mechanic</option>
            {mechanics.map(mechanic => (
              <option key={mechanic.id} value={mechanic.id}>{mechanic.name}</option>
            ))}
          </select>
        </div>
        <h2>Present Tools:</h2>
        <div>
          <button type="button" onClick={selectAll}>Select All</button>
          <button type="button" onClick={deselectAll}>Deselect All</button>
        </div>
        {Object.keys(toolsByCategory).map(category => (
          <div key={category} className={styles.category}>
            <h3 onClick={() => toggleCategory(category)} style={{ cursor: 'pointer' }}>
              {category} {visibleCategories[category] ? '▲' : '▼'}
            </h3>
            {visibleCategories[category] && (
              <div>
                {toolsByCategory[category].map(tool => (
                  <div key={tool.id} className={styles['tool-item']}>
                    <label>
                      <input
                        type="checkbox"
                        value={tool.id}
                        checked={presentTools.includes(tool.id.toString())}
                        onChange={handleToolChange}
                      />
                      {tool.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button type="submit">Submit Conference</button>
      </form>
    </div>
  );
}

export default Conference;
