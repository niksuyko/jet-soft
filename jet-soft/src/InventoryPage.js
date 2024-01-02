// InventoryPage.js
import React, { useState, useEffect } from 'react';
import './App.css';

function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [showInventory, setShowInventory] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/inventory')
      .then(response => response.json())
      .then(data => {
        setInventoryItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
        setLoading(false);
      });
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault(); // Prevent form submission if you're using a form
    const newItem = {
      item_name: itemName,
      quantity: itemQuantity,
    };

    fetch('http://localhost:3001/api/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
      setInventoryItems(prevInventoryItems => [...prevInventoryItems, data]);
      setItemName('');
      setItemQuantity('');
      console.log('Item added:', data);
    })
    .catch(error => {
      console.error('Error adding item:', error);
    });
  };

  if (loading) {
    return <div>Loading inventory...</div>;
  }

  return (
    <div className="main-content">
      <button className="inventory-button" onClick={() => setShowInventory(!showInventory)}>
        {showInventory ? 'Hide Inventory' : 'Show Inventory'}
      </button>

      {showInventory && (
        <section className="inventory-section">
          <h2>Inventory</h2>
          <ul>
            {inventoryItems.map(item => (
              <li key={item.id}>{item.item_name} - Quantity: {item.quantity}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="add-inventory-section">
        <h2>Add Inventory Item</h2>
        <form onSubmit={handleAddItem}>
          <input 
            type="text" 
            placeholder="Item Name" 
            value={itemName} 
            onChange={e => setItemName(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Quantity" 
            value={itemQuantity} 
            onChange={e => setItemQuantity(e.target.value)}
          />
          <button type="submit">Add Item</button>
        </form>
      </section>

      <section className="search-section">
        <h2>Search Inventory</h2>
        <input type="text" placeholder="Search..."/>
        <button>Search</button>
        {/* Search functionality will be implemented here */}
      </section>
    </div>
  );
}

export default InventoryPage;
