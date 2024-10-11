import React, { useState } from 'react';
import '../../assets/styles/index.css'

const Evolutions = () => {
    const [select1, setSelect1] = useState('');
    const [select2, setSelect2] = useState('');
    const [select3, setSelect3] = useState('');
    const [username, setUsername] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

        // Manejador de copiar al portapapeles
        const handleCopy = () => {
            const copyText = `${select1} ${select2} ${select3} ${username} ${additionalInfo}`;
            navigator.clipboard.writeText(copyText).then(() => {
                alert('Copied to clipboard!');
            });
        };

    const [textareaContent, setTextareaContent] = useState("This is a non-editable text area.");

  return (
    <>
             <div className="evolutions w-full mb-20 xl:mb-0 px-4">
      <div style={{ padding: '20px' }}>
        {/* Selects en línea horizontal */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 flex">
          <form className="w-full lg:w-8/12">
            {/* Selects en línea horizontal */}
            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-4/12 px-4">
                <select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={select1}
                  onChange={(e) => setSelect1(e.target.value)}
                >
                  <option value="">Select 1</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={select2}
                  onChange={(e) => setSelect2(e.target.value)}
                >
                  <option value="">Select 2</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={select3}
                  onChange={(e) => setSelect3(e.target.value)}
                >
                  <option value="">Select 3</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
            </div>

            {/* Primer input */}
            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-6/12 px-4">
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Text area no modificable */}
            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-12/12 px-4">
                <textarea
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={select1 + " " + select2 + " " + " " + select3 + " " + username + " " + additionalInfo}
                  rows="4"
                  readOnly
                ></textarea>
              </div>
            </div>

            {/* Segundo input */}
            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-6/12 px-4">
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter additional information"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>
            </div>
          </form>

          {/* Card a la derecha de los inputs */}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full lg:w-4/12 mb-6 shadow-xl rounded-lg">
            <div className="absolute top-4 right-4">
              <button
                className="focus:outline-none"
                onClick={handleCopy}
              >
                <i className="fas fa-copy"></i>
              </button>
            </div>
            <div className="px-6">
              <div className="text-center">
                <p>
                {select1 + " " + select2 + " " + " " + select3 + " " + username + " " + additionalInfo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Evolutions