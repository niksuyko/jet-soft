// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientsPage from './ClientsPage'; // Make sure the path is correct for your project structure
import InventoryPage from './InventoryPage'; // You should create a separate component for inventory similar to ClientsPage
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <Link to="/">
            <button className="sidebar-icon inventoryside-button">
              <img src="inventory.png" alt="Inventory" />
            </button>
          </Link>
          <Link to="/clients">
            <button className="sidebar-icon clients-button">
              <img src="clients.png" alt="Clients" />
            </button>
          </Link>
        </div>

        <header className="App-header">
          <img src={"jetcorrect.png"} alt="Logo" className="App-logo" />
        </header>

        <Routes>
          <Route path='/' element={<InventoryPage />} />
          <Route path='/clients' element={<ClientsPage />} />
        </Routes>

        <footer className="App-footer">
          <p>© 2023 JetCorrect</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
