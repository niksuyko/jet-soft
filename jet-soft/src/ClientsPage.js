import React, { useState, useEffect } from 'react';
import './App.css';
import { Panel } from 'rsuite';

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    phone_number: '',
    tail_number: '',
    additional_comments: '',
    priority: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showClientDetailModal, setShowClientDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    fetch('http://localhost:3001/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error fetching clients:', error));

    const scrollContainer = document.querySelector('.scrollable-container');

    if (scrollContainer) {
      let isDown = false;
      let startX;
      let scrollLeft;

      scrollContainer.addEventListener('mousedown', (e) => {
        if (e.button === 1) return;
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
      });

      scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = 'default';
      });

      scrollContainer.addEventListener('mouseup', (e) => {
        if (e.button === 1) return;
        isDown = false;
        scrollContainer.style.cursor = 'default';
      });

      scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1;
        scrollContainer.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
    document.body.classList.toggle('modal-open');
  };

  const toggleAddClientModal = () => {
    toggleModal();
  };

  const openClientDetailModal = (client) => {
    console.log(client); // Add this line to debug
    setSelectedClient(client);
    setShowClientDetailModal(true);
    document.body.classList.add('modal-open');
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const closeModal = () => {
    setShowModal(false);
    setShowClientDetailModal(false);
    setSelectedClient(null);
    document.body.classList.remove('modal-open');
  };

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
      setNewClient({ name: '', phone_number: '', tail_number: '', additional_comments: '', priority: '' });
      toggleModal();
    })
    .catch(error => console.error('Error:', error));
  };

  const handleDeleteClient = (clientId) => {
    fetch(`http://localhost:3001/api/clients/${clientId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      // Removes the deleted client from the state to update the UI
      const updatedClients = clients.filter(client => client.id !== clientId);
      setClients(updatedClients);
      // Close the modal after deletion
      setShowClientDetailModal(false);
    })
    .catch(error => console.error('Error:', error));
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({
      ...newClient,
      [name]: value
    });
  };

  return (
    <div className="main-content">
      {showModal && (
        <div className="modal-background" onClick={toggleModal}>
          <div className="modal-container" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-content">
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
                  <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <textarea id="priority" name="priority" placeholder="Priority: 1-10" value={newClient.priority} onChange={handleInputChange}></textarea>
                  </div>
                  <button type="submit" className="submit-client-btn">Add Client</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}



{showClientDetailModal && selectedClient && (
  <div className="modal-background" onClick={closeModal}>
    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
        <h3>Client Details</h3>
        <p>Name: {selectedClient.name}</p>
        <p>Phone Number: {selectedClient.phone_number}</p>
        <p>Tail Number: {selectedClient.tail_number}</p>
        <p>Additional Comments: {selectedClient.additional_comments}</p>
        <p>Priority: {selectedClient.priority}</p>
        {/* Add Delete Button Here */}
        <button type="submit" className="delete-client" onClick={() => handleDeleteClient(selectedClient.id)} style={{marginTop: "10px", cursor: "pointer", border: "none", borderRadius: "4px", padding: "5px 10px"}}>
          Delete Client
        </button>
      </div>
    </div>
  </div>
)}
      
      <div className="scrollable-container">
        <div className="card plus-card" onClick={toggleModal}>
          <img src="plus.png" alt="Add" width='100px' />
        </div>
        {clients.filter(client => 
  (client.name?.toLowerCase() || '').includes(searchTerm) ||
  (client.phoneNumber?.toLowerCase() || '').includes(searchTerm) ||
  (client.tailNumber?.toLowerCase() || '').includes(searchTerm) ||
  (client.additionalComments?.toLowerCase() || '').includes(searchTerm)
).map((client) => (
  <div key={client.id} className="card client-card" onClick={() => openClientDetailModal(client)}>
    <div className="container">
      <h4><font size="10"><b>{client.name}</b></font></h4>
      <h5><font size="5"><b>{client.tail_number}</b></font></h5>
      <img className = "priority-pic"
        src={`${process.env.PUBLIC_URL}/priority${client.priority}.png`} 
        alt={`Priority ${client.priority}`} 
      />
    </div>
  </div>
))}

      </div>
      <div class="search-bar-container">
  <input
    type="text"
    placeholder="Search clients..."
    onChange={handleSearchChange}
    className="search-input"
  />
</div>
    </div>
    
  );
}

export default ClientsPage;
