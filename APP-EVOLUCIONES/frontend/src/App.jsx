
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
    </>
  );
};
 
export default App; 
 */