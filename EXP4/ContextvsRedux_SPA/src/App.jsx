import { useState } from 'react';
import ContextApp from './context/App';
import ReduxApp from './redux/App';

function App() {
  const [view, setView] = useState('context');

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1e272e', marginBottom: '0.5rem' }}>
          State Comparison
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Context API vs Redux implementation</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <button
          onClick={() => setView('context')}
          className={`btn-outline ${view === 'context' ? 'active' : ''}`}
        >
          Context API
        </button>
        <button
          onClick={() => setView('redux')}
          className={`btn-outline ${view === 'redux' ? 'active' : ''}`}
        >
          Redux
        </button>
      </div>

      <div className="glass" style={{ borderRadius: 'var(--radius)', overflow: 'hidden', padding: '1rem' }}>
        {view === 'context' ? <ContextApp /> : <ReduxApp />}
      </div>
    </div>
  );
}

export default App;
