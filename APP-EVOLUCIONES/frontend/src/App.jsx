
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
/* import store from './store/store' */
import { Provider } from 'react-redux';

function App() {
    return (
		  <RouterProvider router={router} />
    )
}

export default App 
/* 
import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  const [actividades, setActividades] = useState([]);
  const [habilidad, setHabilidad] = useState('');
  
  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await api.get('/actividades');
        setActividades(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching actividades', error);
      }
    };

    fetchActividades();
  }, []);

  const handleAddHabilidad = async () => {
    console.log(habilidad)

    try {
      const response = await api.post('/habilidad', { name: habilidad });
      alert(`Habilidad ${response.data.NAME_HAB} creada!`);
      setHabilidad('');
    } catch (error) {
      console.error('Error adding habilidad', error);
    }
  };

  return (
    <div className='bg-blue-400 w-full h-48 '>
      <h1 >Actividades</h1>
      <ul>
        {actividades.map((act) => (
          <li key={act.ID_ACT}>{act.NAME_ACT}</li>
        ))}
      </ul>
      <div>
        <h2>Agregar Habilidad</h2>
        <input
          type="text"
          value={habilidad}
          onChange={(e) => setHabilidad(e.target.value)}
        />
        <button onClick={handleAddHabilidad}>Agregar</button>
      </div>
    </div>
  );
};
 
export default App; 
 */