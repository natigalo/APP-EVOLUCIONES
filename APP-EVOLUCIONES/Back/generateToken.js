const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

// Genera un token de prueba
const token = jwt.sign({ userId: 1 }, SECRET_KEY, { expiresIn: '1h' });
console.log('Token:', token);