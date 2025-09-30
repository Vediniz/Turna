import React, { useState, useEffect } from 'react';
import './ScaleForm.css'; // Adicionar esta linha

function ScaleForm({ scale, onSave, onCancel }) {
  // O resto do código permanece o mesmo...
  const [formData, setFormData] = useState({
    firstWorkDay: '',
    workDays: '',
    daysOff: '',
  });

  useEffect(() => {
    if (scale) {
      setFormData({
        firstWorkDay: scale.firstWorkDay || '',
        workDays: scale.workDays || '',
        daysOff: scale.daysOff || '',
      });
    } else {
       setFormData({ firstWorkDay: '', workDays: '', daysOff: '' });
    }
  }, [scale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
        ...formData,
        workDays: parseInt(formData.workDays, 10),
        daysOff: parseInt(formData.daysOff, 10),
    };
    onSave(dataToSave);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{scale ? 'Editar Escala' : 'Nova Escala'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstWorkDay">Primeiro Dia de Trabalho</label>
            <input
              type="date"
              id="firstWorkDay"
              name="firstWorkDay"
              value={formData.firstWorkDay}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="workDays">Dias de Trabalho</label>
            <input
              type="number"
              id="workDays"
              name="workDays"
              value={formData.workDays}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="daysOff">Dias de Folga</label>
            <input
              type="number"
              id="daysOff"
              name="daysOff"
              value={formData.daysOff}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScaleForm;