import React from 'react';
import './Calendar.css'; // Criaremos este arquivo de estilo

const Calendar = ({ schedule, year, month }) => {
  if (!schedule || schedule.length === 0) {
    return <p>Selecione o mês e ano para ver a escala.</p>;
  }

  const monthName = new Date(year, month - 1).toLocaleString('pt-BR', { month: 'long' });
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Calcula o primeiro dia da semana do mês para alinhar o calendário
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const emptyDays = Array(firstDayOfMonth).fill(null);

  return (
    <div className="calendar-container">
      <h2>{`${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${year}`}</h2>
      <div className="calendar-grid">
        {weekDays.map((day) => (
          <div key={day} className="calendar-header">
            {day}
          </div>
        ))}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}
        {schedule.map(({ date, status }) => {
          const dayNumber = new Date(date + 'T00:00:00').getDate();
          const dayClass = status === 'Work' ? 'work-day' : 'off-day';
          return (
            <div key={date} className={`calendar-day ${dayClass}`}>
              <div className="day-number">{dayNumber}</div>
              <div className="day-status">{status === 'Work' ? 'Trabalho' : 'Folga'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;