import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CronList from './components/CronList';
import CronForm from './components/CronForm';
import CronLogs from './components/CronLogs';
import ErrorMessage from './components/ErrorMessage';
import { getAllCrons, deleteCron, toggleCronStatus, executeCron } from './api/cronApi';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/styles.css';

function App() {

  const [crons, setCrons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCron, setEditingCron] = useState(null);
  const [selectedCronLogs, setSelectedCronLogs] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCrons();

    const interval = setInterval(loadCrons, 10000);

    return () => clearInterval(interval);
  }, []);

  // carregar os CRONs da API
  const loadCrons = async () => {
    try {
      const data = await getAllCrons();
      setCrons(data);
    } catch (err) {
      setError('Erro ao carregar CRONs: ' + err.message);
    }
  };

  const handleNewCron = () => {
    setEditingCron(null);
    setShowForm(true);
  };

  const handleEditCron = (cron) => {
    setEditingCron(cron);
    setShowForm(true);
  };

  const handleDeleteCron = async (cronId) => {
    if (!window.confirm('Tem certeza que deseja eliminar este CRON?')) return;
    try {
      await deleteCron(cronId);
      await loadCrons();
    } catch (err) {
      setError('Erro ao eliminar CRON: ' + err.message);
    }
  };

  const handleToggleCron = async (cronId, isActive) => {
    try {
      await toggleCronStatus(cronId, isActive);
      await loadCrons();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleExecuteCron = async (cronId) => {
    try {
      await executeCron(cronId);
      setTimeout(loadCrons, 500); 
    } catch (err) {
      setError('Erro ao executar CRON: ' + err.message);
    }
  };

  const handleViewLogs = (cron) => {
    setSelectedCronLogs(cron);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCron(null);
  };

  const handleCloseLogs = () => {
    setSelectedCronLogs(null);
  };

  const handleFormSuccess = async () => {
    await loadCrons();
    handleCloseForm();
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-info p-4">
      <div className="container-fluid">
        <Header 
          totalCrons={crons.length}
          activeCrons={crons.filter(c => c.isActive).length}
          onNewCron={handleNewCron}
        />

        {error && (
          <ErrorMessage 
            message={error} 
            onClose={() => setError('')} 
          />
        )}
        
        <div className="bg-white rounded-3 shadow-sm border p-4">
          <CronList 
            crons={crons}
            onEdit={handleEditCron}
            onDelete={handleDeleteCron}
            onToggle={handleToggleCron}
            onExecute={handleExecuteCron}
            onViewLogs={handleViewLogs}
          />
        </div>
      </div>

      {showForm && (
        <CronForm 
          editingCron={editingCron}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
          onError={setError}
        />
      )}

      {selectedCronLogs && (
        <CronLogs 
          cron={selectedCronLogs}
          onClose={handleCloseLogs}
        />
      )}
    </div>
  );
}

export default App;