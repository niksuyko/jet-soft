import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function JetTrackingPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_ENDPOINT = 'https://api.aviationstack.com/v1/flights';
    const API_KEY = '5b7409bc2ed7e040208cc26918a9e740'; // Replace with your actual API key

    axios.get(API_ENDPOINT, {
      params: {
        access_key: API_KEY,
        // Add any additional parameters you need here
      }
    })
    .then(response => {
      setFlights(response.data.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);

      // Additional error logging
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
      } else {
        console.log('Error message:', error.message);
      }
    });
  }, []);

  if (loading) return <p>Loading flights...</p>;
  if (error) return <p>Error fetching flights: {error.message}</p>;

  return (
    <div className="main-content">
      <h2>Jet Tracking</h2>
      <div className="jet-tracking-section">
        {flights.length > 0 ? (
          <ul>
            {flights.map(flight => (
              <li key={flight.flight_date + flight.flight.iata}>
                {flight.airline.name} Flight {flight.flight.iata} from {flight.departure.airport} to {flight.arrival.airport} is {flight.flight_status}.
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights data available.</p>
        )}
      </div>
    </div>
  );
}

export default JetTrackingPage;
