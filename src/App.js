import React, { useState, useEffect } from 'react';
import MyTable from './Table/MyTable';


const App = () => {
 
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') // Replace with your API URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(res => {
        setEmployees(res);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data: {error.message}</p>}
      {employees.length>0 && !loading && !error && <MyTable employees={employees} />}
    </div>
  );

}

export default App;


