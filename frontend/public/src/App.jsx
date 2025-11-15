import React, { useState, useEffect } from 'react';
import { getScales, getMonthlySchedule, createScale, updateScale, deleteScale } from './services/api';
import ScaleList from './components/ScaleList';
import Calendar from './components/Calendar';
import ScaleForm from './components/ScaleForm';
import './App.css'; // Criaremos este arquivo de estilo

function App() {
  const [scales, setScales] = useState([]);
  const [selectedScale, setSelectedScale] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scaleToEdit, setScaleToEdit] = useState(null);

  useEffect(() => {
    loadScales();
  }, []);

  useEffect(() => {
    if (selectedScale) {
      loadSchedule();
    }
  }, [selectedScale, currentDate]);

  const loadScales = async () => {
    try {
      setIsLoading(true);
      const response = await getScales();
      setScales(response.data);
      setError('');
    } catch (err) {
      setError('Falha ao carregar as escalas. Verifique se o back-end está rodando.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSchedule = async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    try {
      setIsLoading(true);
      const response = await getMonthlySchedule(selectedScale.id, year, month);
      setSchedule(response.data);
      setError('');
    } catch (err) {
      setError('Falha ao carregar o cronograma.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectScale = (scale) => {
    setSelectedScale(scale);
    setSchedule([]); // Limpa a agenda anterior
  };
  
  const handleDateChange = (e) => {
    const [year, month] = e.target.value.split('-').map(Number);
    setCurrentDate(new Date(year, month - 1));
  };
  
  const handleSaveScale = async (scaleData) => {
    try {
        if (scaleToEdit) {
            await updateScale(scaleToEdit.id, scaleData);
        } else {
            await createScale(scaleData);
        }
        setIsModalOpen(false);
        setScaleToEdit(null);
        loadScales(); // Recarrega a lista
    } catch (err) {
        setError('Falha ao salvar a escala.');
        console.error(err);
    }
  };

  const handleEdit = (scale) => {
      setScaleToEdit(scale);
      setIsModalOpen(true);
  };
  
  const handleDelete = async (id) => {
      if (window.confirm('Tem certeza que deseja excluir esta escala?')) {
          try {
              await deleteScale(id);
              loadScales();
              if (selectedScale && selectedScale.id === id) {
                  setSelectedScale(null);
                  setSchedule([]);
              }
          } catch (err) {
              setError('Falha ao excluir a escala.');
              console.error(err);
          }
      }
  };
  
  const handleAddNew = () => {
      setScaleToEdit(null);
      setIsModalOpen(true);
  }

  return (
    <>
      <header className="app-header">
        <h1>Turna - Gerenciador de Escalas 🗓️</h1>
      </header>
      <main className="container">
        {error && <p className="error-message">{error}</p>}

        <div className="controls">
            <h2>Minhas Escalas</h2>
            <button onClick={handleAddNew}>+ Nova Escala</button>
        </div>

        {isLoading && scales.length === 0 ? (
          <div className="loader"></div>
        ) : (
          <ScaleList scales={scales} onSelect={handleSelectScale} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        {selectedScale && (
          <div className="schedule-section">
            <h2>Calendário da Escala {selectedScale.id}</h2>
            <div className="form-group">
                <label htmlFor="month-picker">Selecione o Mês e Ano</label>
                <input
                  id="month-picker"
                  type="month"
                  value={`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`}
                  onChange={handleDateChange}
                />
            </div>
            {isLoading && schedule.length === 0 ? <div className="loader"></div> : <Calendar schedule={schedule} year={currentDate.getFullYear()} month={currentDate.getMonth() + 1} />}
          </div>
        )}

        {isModalOpen && <ScaleForm scale={scaleToEdit} onSave={handleSaveScale} onCancel={() => setIsModalOpen(false)} />}
      </main>
    </>
  );
}

export default App;