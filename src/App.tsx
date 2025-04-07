
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={
          <div>
            <h1>FaithStewards</h1>
            <p>Welcome to the homepage!</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
