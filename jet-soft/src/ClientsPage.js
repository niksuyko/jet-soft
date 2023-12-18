import React from 'react';
import './App.css';

function ClientsPage() {
  // Placeholder data for clients, to be replaced with data from your database
  const currentClients = ['Client 1', 'Client 2', 'Client 3'];

  return (
    <div className="main-content">
      <h2>Clients</h2>
      
      <div className="client-dropdown-section">
        <label htmlFor="client-select">Select a client:</label>
        <select id="client-select">
          {currentClients.map((client, index) => (
            <option key={index} value={client}>{client}</option>
          ))}
        </select>
      </div>

      <div className="add-client-form-section">
        <h3>Add New Client</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Name" />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number:</label>
            <input type="text" id="phone-number" placeholder="Phone Number" />
          </div>
          <div className="form-group">
            <label htmlFor="tail-number">Tail Number:</label>
            <input type="text" id="tail-number" placeholder="Tail Number" />
          </div>
          <div className="form-group">
            <label htmlFor="additional-comments">Additional Comments:</label>
            <textarea id="additional-comments" placeholder="Additional Comments"></textarea>
          </div>
          <button type="submit" className="submit-client-btn">Add Client</button>
        </form>
      </div>
    </div>
  );
}

export default ClientsPage;
