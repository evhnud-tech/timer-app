import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  useEffect(() => {
    let timer = null;
    
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const handleSetTime = () => {
    const totalSeconds = (parseInt(inputMinutes) || 0) * 60 + (parseInt(inputSeconds) || 0);
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setInitialTime(totalSeconds);
      setIsRunning(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    const value = parseInt(e.target.value) || 0;
    setter(value);
  };

  return (
    <div className="timer-container">
      <div className="time-display">
        {formatTime(timeLeft)}
      </div>

      <div className="controls">
        <div className="input-group">
          <input
            type="number"
            min="0"
            max="59"
            value={inputMinutes}
            onChange={handleInputChange(setInputMinutes)}
            placeholder="Мин"
            disabled={isRunning}
          />
          <span>:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputSeconds}
            onChange={handleInputChange(setInputSeconds)}
            placeholder="Сек"
            disabled={isRunning}
          />
        </div>
        
        <button 
          className="set-btn" 
          onClick={handleSetTime}
          disabled={isRunning}
        >
          Установить
        </button>
      </div>

      <div className="controls">
        {!isRunning ? (
          <button 
            className="start-btn" 
            onClick={handleStart}
            disabled={timeLeft === 0}
          >
            Старт
          </button>
        ) : (
          <button className="start-btn" onClick={handlePause}>
            Пауза
          </button>
        )}
        
        <button className="reset-btn" onClick={handleReset}>
          Сброс
        </button>
      </div>

      {timeLeft === 0 && initialTime > 0 && (
        <div className="message finished">
          ⏰ Время вышло!
        </div>
      )}
      
      {isRunning && (
        <div className="message running">
          ⏱️ Таймер запущен...
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;