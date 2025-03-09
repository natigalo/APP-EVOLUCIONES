// authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'S3CR3TK3Y.*';

const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '12h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    req.userId = decoded.userId; // Opcional: guarda el ID del usuario para usarlo en las rutas
    next();
  });
};

module.exports = {
  verifyToken,
  generateToken,
};
