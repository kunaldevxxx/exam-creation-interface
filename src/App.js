import React, { Suspense, lazy } from 'react';
import './index.css';
// Lazy load the ExamCreationInterface component
const ExamCreationInterface = lazy(() => import('./components/ExamCreationInterface'));

function App() {
  return (
    <div className="App">
      {/* Wrap the lazy-loaded component in Suspense for fallback UI */}
      <Suspense fallback={<div>Loading...</div>}>
        <ExamCreationInterface />
      </Suspense>
    </div>
  );
}

export default App;