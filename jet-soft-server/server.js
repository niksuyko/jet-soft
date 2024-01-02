const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // For parsing application/json

// PostgreSQL connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('/api/inventory', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM inventory');
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});
  

app.post('/api/inventory', async (req, res) => {
  try {
    const { item_name, quantity } = req.body;
    // Check if the item already exists
    const existingItem = await pool.query('SELECT * FROM inventory WHERE item_name = $1', [item_name]);

    if (existingItem.rows.length > 0) {
      // Item exists, update the quantity
      const updatedQuantity = existingItem.rows[0].quantity + parseInt(quantity);
      const updateQuery = 'UPDATE inventory SET quantity = $1 WHERE item_name = $2 RETURNING *';
      const updatedItem = await pool.query(updateQuery, [updatedQuantity, item_name]);
      res.json(updatedItem.rows[0]);
    } else {
      // Item does not exist, insert a new row
      const insertQuery = 'INSERT INTO inventory (item_name, quantity) VALUES ($1, $2) RETURNING *';
      const newItem = await pool.query(insertQuery, [item_name, quantity]);
      res.json(newItem.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

  
app.get('/api/clients', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM clients');
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

app.get('/api/inventory/search', async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const query = 'SELECT * FROM inventory WHERE item_name LIKE $1';
    const values = [`%${searchQuery}%`]; // '%' wildcards are used to match any sequence of characters

    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


app.post('/api/clients', async (req, res) => {
    try {
      const { name, phone_number, tail_number, additional_comments } = req.body;
      const newClient = await pool.query(
        'INSERT INTO clients (name, phone_number, tail_number, additional_comments) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, phone_number, tail_number, additional_comments]
      );
      res.json(newClient.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});
  