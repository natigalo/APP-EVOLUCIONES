import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../assets/styles/index.css'

const Evolutions = () => {
    const [selectObj, setSelectObj] = useState({ id: '', name: '' });
    const [selectHab, setSelectHab] = useState({ id: '', name: '' });
    const [selectAct, setSelectAct] = useState({ id: '', name: '' });
    const [textIntro, setTextIntro] = useState('');
    const [options, setOptions] = useState([]); // Almacenará las opciones del select
    const [selectedOption, setSelectedOption] = useState({ Id: 0, IntroduccionText: '' }); // Guarda el objeto seleccionado (con ID y nombre)
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [apiData, setApiData] = useState([]);
    const [apiHabilidad, setApiHabilidad] = useState([]);
    const [apiObjetivos, setApiObjetivos] = useState([]);
    const [apiActividad, setApiActividades] = useState([]);
    const [apiObjHabi, setApiObjHab] = useState([]);

    const IdUsuario = localStorage.getItem('userId'); // Obtén el IdUsuario


    // Obtener el token del localStorage
    const token = localStorage.getItem('token'); // Asegúrate de que 'token' es el nombre correcto

    // Manejador de copiar al portapapeles
    const handleCopy = () => {
      const copyText = `${textIntro} ${selectObj.name} ${selectHab.name} ${selectAct.name} ${additionalInfo}`;
      navigator.clipboard.writeText(copyText).then(() => {
          alert('Copied to clipboard!');
      });
  };

    // Crear una instancia de Axios con el token en el header
    const api = axios.create({
        baseURL: 'http://localhost:3000', // Cambia la URL base según sea necesario
        headers: {
            Authorization: `${token}`, // Agregar el token al header de autorización
        },
    });

    // Llamada a la API al montar el componente
    useEffect(() => {
        
        api.get('/habilidades')
            .then((response) => {
                setApiHabilidad(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error('Error fetching API:', error));
        
        api.get('/objetivos')
            .then((response) => {
                setApiObjetivos(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error('Error fetching API:', error));
        
        api.get('/actividades')
            .then((response) => {
                setApiActividades(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error('Error fetching API:', error));
        
        api.get('/actividades')
            .then((response) => {
                setApiObjHab(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error('Error fetching API:', error));
        console.log(IdUsuario)
        api.get(`/getIntroByIdUser/${IdUsuario}`)
            .then((response) => {
                console.log('Datos:', response.data);
                setOptions(response.data);
            })
            .catch((error) => console.error('Error data:', error));

    }, []);

    useEffect(() => {
        if (selectObj.id !== 0) {
            api.get(`/Idobj_habi/${selectObj.id}`)
                .then((response) => {
                    console.log('Datos de habilidades relacionadas:', response.data);
                    setApiHabilidad(response.data);
                })
                .catch((error) => console.error('Error fetching objetivo-habilidad data:', error));
        } else {
            api.get('/habilidades')
                .then((response) => {
                    setApiHabilidad(response.data);
                    console.log(response.data);
                });
            api.get('/actividades')
                .then((response) => {
                    setApiActividades(response.data);
                    console.log(response.data);
                });
            api.get('/objetivos')
                .then((response) => {
                    setApiObjetivos(response.data);
                    console.log(response.data);
                });
        }
    }, [selectObj]);

    useEffect(() => {
        if (selectHab.id !== 0) {
            api.get(`/Idhabi_act/${selectHab.id}`)
                .then((response) => {
                    setApiActividades(response.data);
                })
                .catch((error) => console.error('Error fetching objetivo-habilidad data:', error));
            api.get(`/Idhab_obj/${selectHab.id}`)
                .then((response) => {
                    setApiObjetivos(response.data);
                    console.log(response.data);
                })
                .catch((error) => console.error('Error fetching objetivo-habilidad data:', error));
        } else if (selectObj.id !== 0) {
            // No hay acción definida aquí
        } else {
            api.get('/actividades')
                .then((response) => {
                    setApiActividades(response.data);
                    console.log(response.data);
                });
        }
    }, [selectHab]);

    useEffect(() => {
        if (selectAct.id !== 0) {
            api.get(`/Idact_hab/${selectAct.id}`)
                .then((response) => {
                    console.log('Datos de habilidades relacionadas:', response.data);
                    setApiHabilidad(response.data);
                })
                .catch((error) => console.error('Error fetching objetivo-habilidad data:', error));
        } else {
            api.get('/habilidades')
                .then((response) => {
                    setApiHabilidad(response.data);
                    console.log(response.data);
                });
        }
    }, [selectAct]);

        // Método para guardar en la base de datos
        const handleSave = (e) => {
          e.preventDefault(); // Evita el comportamiento predeterminado del formulario

          const dataToSave = {
            IntroduccionText: textIntro, // Cambié 'textIntro' a 'IntroduccionText' para coincidir con el backend
            IdUsuario
          };

          // Asegúrate de que la URL sea la correcta
          api.post('/saveIntro', dataToSave)  // Cambié la URL a '/saveIntro'
            .then((response) => {
              alert('Datos guardados con éxito');
              console.log('Guardado exitoso:', response.data);
            })
            .catch((error) => {
              console.error('Error al guardar los datos:', error);
              alert('Error al guardar los datos');
            });
        };


    const [textareaContent, setTextareaContent] = useState("This is a non-editable text area.");

  return (
    <>
    <div className="evolutions w-full mb-20 xl:mb-0 px-2">
      <div style={{ padding: '0px' }}>
        <div className="flex flex-col lg:flex-row lg:space-x-2 py-10">
          <form className="w-full lg:w-8/12">
            

            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-12/12 px-4">
                {/* Select que muestra las opciones de la API */}
                <select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mb-2"
                  value={selectedOption.IntroduccionText || ''} // Muestra el texto de la opción seleccionada
                  onChange={(e) => {
                    const obj = JSON.parse(e.target.value); // Deserializa el objeto seleccionado
                    setSelectedOption(obj); // Actualiza el estado con el objeto seleccionado
                    setTextIntro(obj.IntroduccionText); // Actualiza el input con el texto seleccionado
                  }}
                >
                  <option value={JSON.stringify({ id: 0, IntroduccionText: '' })}>Seleccione una opción</option>
                  {options.map((option) => (
                    <option key={option.id} value={JSON.stringify({ id: option.id, IntroduccionText: option.IntroduccionText })}>
                      {option.IntroduccionText}
                    </option>
                  ))}
                </select>

                {/* Input de texto para escribir */}
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Escribe o selecciona una opción"
                  value={textIntro}
                  onChange={(e) => setTextIntro(e.target.value)} // Actualiza el estado cuando se escribe
                />

                {/* Botón de guardado */}
                <button onClick={handleSave} className="save-button mt-2">
                  <i className="fas fa-save" style={{ color: 'blue' }}></i>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-4/12 px-4">
                <select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={selectObj.NAME_OBJ}
                  onChange={(e) => {
                    const obj = JSON.parse(e.target.value);
                    setSelectObj({ id: obj.ID_OBJ, name: obj.NAME_OBJ }); // Guarda ambos valores en el estado
                  }}
                >
                  <option value={JSON.stringify({ ID_OBJ: 0, NAME_OBJ: "" })}>Seleccione el objetivo</option>
                  {apiObjetivos.map((objetivo) => (
                    <option key={objetivo.ID_OBJ} value={JSON.stringify({ ID_OBJ: objetivo.ID_OBJ, NAME_OBJ: objetivo.NAME_OBJ })}>
                      {objetivo.NAME_OBJ}
                    </option>
                  ))}
                </select>
                {/* {console.log(selectObj)} */}
              </div>

              {/* Segundo select con las opciones de habilidades */}
              <div className="w-full lg:w-4/12 px-4">
                <select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={selectHab.NAME_HAB}
                  onChange={(e) => {
                    const obj = JSON.parse(e.target.value);
                    setSelectHab({ id: obj.ID_HAB, name: obj.NAME_HAB }); // Guarda ambos valores en el estado
                  }}                >
                  <option value={JSON.stringify({ ID_HAB: 0, NAME_HAB: "" })}>Seleccione la habilidad</option>
                  {apiHabilidad.map((habilidad) => (
                    <option key={habilidad.ID_HAB} value={JSON.stringify({ ID_HAB: habilidad.ID_HAB, NAME_HAB: habilidad.NAME_HAB })}>
                      {habilidad.NAME_HAB}
                    </option>
                  ))}
                </select>
                {console.log(selectHab, 'HABILIDADES')}
              </div>

              <div className="w-full lg:w-4/12 px-4">
              <select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={selectAct.NAME_ACT}
                  onChange={(e) => {
                    const obj = JSON.parse(e.target.value);
                    setSelectAct({ id: obj.ID_ACT, name: obj.NAME_ACT }); // Guarda ambos valores en el estado
                  }}                >
                  <option value={JSON.stringify({ ID_ACT: 0, NAME_ACT: "" })}>Seleccione la actividad</option>
                  {apiActividad.map((actividad) => (
                    <option key={actividad.ID_ACT} value={JSON.stringify({ ID_ACT: actividad.ID_ACT, NAME_ACT: actividad.NAME_ACT })}>
                      {actividad.NAME_ACT}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-12/12 px-4">
                <textarea
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={`${textIntro} ${selectObj.name} involucrando ${selectHab.name} ${selectAct.name} ${additionalInfo}`}
                  rows="4"
                  // readOnly
                ></textarea>
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
            <div className="w-full lg:w-12/12 px-4">
            <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder=""
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>
            </div>
          </form>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full lg:w-4/12 lg:mt-0 mb-6 shadow-xl rounded-lg p-4">
            <div className="absolute top-4 right-4">
              <button className="focus:outline-none" onClick={handleCopy}>
                <i className="fas fa-copy"></i>
              </button>
            </div>
            <div className="px-6 py-4 text-center">
              <p className="text-gray-700 text-base">
                {`${textIntro} ${selectObj.name} ${selectHab.name} ${selectAct.name} ${additionalInfo}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Evolutions