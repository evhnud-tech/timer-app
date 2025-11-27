import React from 'react';
import CountdownTimer from './components/CountdownTimer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Таймер обратного отсчёта</h1>
        <CountdownTimer />
      </header>
    </div>
  );
}

export default App;