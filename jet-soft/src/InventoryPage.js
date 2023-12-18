// InventoryPage.js
import React, { useState } from 'react';
import './App.css';

function InventoryPage() {
  const [showInventory, setShowInventory] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleAddItem = () => {
    console.log("Adding item:", itemName, "Quantity:", itemQuantity);
    // Add logic to actually add the item to inventory
  };

  return (
    <div className="main-content">
      <button className="inventory-button" onClick={() => setShowInventory(!showInventory)}>
        {showInventory ? 'Hide Inventory' : 'Show Inventory'}
      </button>

      {showInventory && (
        <section className="inventory-section">
          <h2>Inventory</h2>
          {/* Inventory items will be listed here */}
        </section>
      )}

      <section className="add-inventory-section">
        <h2>Add Inventory Item</h2>
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
        <button onClick={handleAddItem}>Add Item</button>
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
