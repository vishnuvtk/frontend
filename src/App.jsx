import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearchFlights = async () => {
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('/api/flights', {
                origin,
                destination,
                date,
            });
            setFlights(response.data);
        } catch (error) {
            console.error('Error fetching flight data:', error);
            setError('Failed to fetch flight data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Travel Planner Hub</h1>
            <div className="form-container">
                <label>
                    Origin Airport (IATA Code):
                    <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="e.g., JFK"
                    />
                </label>
                <label>
                    Destination Airport (IATA Code):
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g., LHR"
                    />
                </label>
                <label>
                    Departure Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <button onClick={handleSearchFlights}>Find Flights</button>
            </div>

            {loading && <p>Loading...</p>}

            {error && <p className="error-message">{error}</p>}

            <div className="flights-container">
                <h2>Available Flights</h2>
                {flights.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Flight Number</th>
                                <th>Airline</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Price (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight, index) => (
                                <tr key={index}>
                                    <td>{flight.flightNumber}</td>
                                    <td>{flight.airline}</td>
                                    <td>{new Date(flight.departureDate).toLocaleString()}</td>
                                    <td>{new Date(flight.arrivalDate).toLocaleString()}</td>
                                    <td>${flight.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No flights available.</p>
                )}
            </div>
        </div>
    );
}

export default App;
