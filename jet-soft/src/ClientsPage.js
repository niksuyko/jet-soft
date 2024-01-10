import React, { useState, useEffect } from 'react';
import './App.css';


function ClientsPage() {

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    phoneNumber: '',
    tailNumber: '',
    additionalComments: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  

  const handleAddClient = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    })
    .then(response => response.json())
    .then(data => {
      setClients([...clients, data]);
      setNewClient({ name: '', phoneNumber: '', tailNumber: '', additionalComments: '' });
    })
    .catch(error => console.error('Error:', error));
  };
  const currentClients = ['Client 1', 'Client 2', 'Client 3'];
  function handleSelectChange(e) {
    const clientId = e.target.value;
    const client = clients.find(client => client.id === parseInt(clientId));
    setSelectedClient(client);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({
      ...newClient,
      [name]: value
    });
  };
  return (
    <div className="main-content">
      
      
      <div className="client-dropdown-section">
      <h2>Clients</h2>
        <label htmlFor="client-select">Select a client:</label>
        <select id="client-select" onChange={handleSelectChange} defaultValue="">
          <option value="" disabled>Select a client</option>
          <option value="none" disabled>None</option> {}
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>
  
      {selectedClient && (
        <div className="client-details-section">
          <h3>Client Details</h3>
          <p>Name: {selectedClient.name}</p>
          <p>Phone Number: {selectedClient.phone_number}</p>
          <p>Tail Number: {selectedClient.tail_number}</p>
          <p>Additional Comments: {selectedClient.additional_comments}</p>
        </div>
      )}
  
      <div className="add-client-form-section">
        <h3>Add New Client</h3>
        <form onSubmit={handleAddClient}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Name" value={newClient.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number:</label>
            <input type="text" id="phone-number" name="phone_number" placeholder="Phone Number" value={newClient.phone_number} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="tail-number">Tail Number:</label>
            <input type="text" id="tail-number" name="tail_number" placeholder="Tail Number" value={newClient.tail_number} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="additional-comments">Additional Comments:</label>
            <textarea id="additional-comments" name="additional_comments" placeholder="Additional Comments" value={newClient.additional_comments} onChange={handleInputChange}></textarea>
          </div>
          <button type="submit" className="submit-client-btn">Add Client</button>
        </form>
      </div>
    </div>
  );
  
}

export default ClientsPage;
