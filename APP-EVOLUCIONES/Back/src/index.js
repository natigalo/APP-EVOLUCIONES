const express = require('express');
const app= express();
const cors = require('cors');
//middelwares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con el origen de tu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


//routes
app.use(require('../routes/index.js'));

app.listen(3000)
console.log('server on port 3000')

