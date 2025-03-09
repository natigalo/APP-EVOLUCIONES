import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


export default function Login({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Lógica de autenticación
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: username,
          contrasena: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();
      console.log(data)
      if (data.token) {
        // Almacena el token en localStorage
        localStorage.setItem('token', data.token);

        // Decodificar el token para obtener el userId
        const decodedToken = jwtDecode(data.token);  // Decodifica el token
        console.log('User decodedToken:', decodedToken);

        const userId = decodedToken.userId;  // Extrae el userId del token

        console.log('User ID:', userId);
        localStorage.setItem('userId', userId);

        handleLogin(); // Llama a la función handleLogin que posiblemente maneja el estado de autenticación
        history.push('/evoluciones'); // Redirige a la ruta deseada
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert("Ocurrió un error durante el inicio de sesión");
    }
  };

  return (
    <section className="">
      <div className="h-full w-full px-1 pt-24">
        <div className="flex h-full flex-wrap items-center justify-center">
          {/* Wrapper for image and card with border */}
          <div className="flex items-center rounded-lg border-2 border-gray-300 p-4 space-x-4 w-full md:w-auto">
            
            {/* Left column container with image, hidden on small screens */}
            <div className="md:mb-0 md:w-4/12 lg:w-3/12 hidden md:block mt-12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full" 
                alt="Phone image"
              />
            </div>

            {/* Right column container with form */}
            <div className="w-full md:w-8/12 lg:w-8/12">
              <div className="container mx-auto h-full">
                <div className="flex items-center justify-center h-full">
                  <div className="w-full lg:w-8/12 px-4 mt-20">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                          {/* Espacio para botones de autenticación */}
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </div>
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-blueGray-400 text-center mb-3 font-bold" style={{ fontSize: '36px' }}>
                          <small>Inicia Sesion</small>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="username">
                              Correo
                            </label>
                            <input
                              type="email"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className="border-0 px-4 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Correo"
                              required
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="contraseña">
                              Contraseña
                            </label>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="border-0 px-4 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Contraseña"
                              required
                            />
                          </div>
                          <div className="text-center mt-6">
                            <button
                              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                              type="submit"
                            >
                              Iniciar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
