import React from 'react';
import './ScaleList.css'; // Criaremos este arquivo de estilo

const ScaleList = ({ scales, onSelect, onEdit, onDelete }) => {
  if (scales.length === 0) {
    return <p>Nenhuma escala cadastrada. Crie uma para começar!</p>;
  }

  return (
    <div className="scale-list">
      {scales.map((scale) => (
        <div key={scale.id} className="scale-item">
          <div className="scale-info">
            <h3>Escala {scale.id}</h3>
            <p><strong>Início:</strong> {new Date(scale.firstWorkDay + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
            <p><strong>Ciclo:</strong> {scale.workDays} dias de trabalho / {scale.daysOff} dias de folga</p>
          </div>
          <div className="scale-actions">
            <button onClick={() => onSelect(scale)}>Ver Calendário</button>
            <button className="secondary" onClick={() => onEdit(scale)}>Editar</button>
            <button className="danger" onClick={() => onDelete(scale.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScaleList;