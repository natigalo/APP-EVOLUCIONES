const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/authMiddleware.js'); // Importa el middleware de autenticación

const {
  login,
  register,
  getIntegracionTablas, 
  getObjetivos, 
  getHabiidades, 
  getActividades,
  getIdObjetivoHabilidad,
  getIdActividadHabilidad,
  getIdHabilidadObjetivo,
  getIdHabilidadActividad,
  consultaBd,
  createHabilidad,
  getObjetivoHabilidad,
  createObjetivo, 
  createActividad, 
  createObjetivoHabilidad, 
  createHabilidadActividad, 
  createIntroduccion,
  getIntrByUser,
  updateObjetivo, 
  updateHabilidad, 
  updateActividad, 
  updateObjetivoHabilidad, 
  updateHabilidadActividad, 
  deleteObjetivo, 
  deleteHabilidad, 
  deleteActividad, 
  deleteObjetivoHabilidad, 
  deleteHabilidadActividad
} = require('../controllers/index.controllers.js');

// Rutas públicas
router.post('/register', register); // Ruta de login que no requiere autenticación
router.post('/login', login); // Ruta de login que no requiere autenticación

// // Rutas protegidas
router.get('/integracion', verifyToken.verifyToken, getIntegracionTablas);
router.get('/objetivos', verifyToken.verifyToken, getObjetivos);
router.get('/habilidades', verifyToken.verifyToken, getHabiidades);
router.get('/actividades', verifyToken.verifyToken, getActividades);
router.get('/obj_habi', verifyToken.verifyToken, getObjetivoHabilidad);
router.get('/Idobj_habi/:id', verifyToken.verifyToken, getIdObjetivoHabilidad);
router.get('/Idhabi_act/:id', verifyToken.verifyToken, getIdHabilidadActividad);
router.get('/Idact_hab/:id', verifyToken.verifyToken, getIdActividadHabilidad);
router.get('/Idhab_obj/:id', verifyToken.verifyToken, getIdHabilidadObjetivo);
router.get('/consultabd', verifyToken.verifyToken, consultaBd);
router.get('/getIntroByIdUser/:id', verifyToken.verifyToken, getIntrByUser);


// Rutas para crear datos (también protegidas)
router.post('/objetivo', verifyToken.verifyToken, createObjetivo);
router.post('/habilidad', verifyToken.verifyToken, createHabilidad);
router.post('/actividad', verifyToken.verifyToken, createActividad);
router.post('/obj_habi', verifyToken.verifyToken, createObjetivoHabilidad);
router.post('/hab_act', verifyToken.verifyToken, createHabilidadActividad);
router.post('/saveIntro', verifyToken.verifyToken, createIntroduccion);


// Rutas para editar datos (también protegidas)
router.put('/objetivo/:id', verifyToken.verifyToken, updateObjetivo);
router.put('/habilidad/:id', verifyToken.verifyToken, updateHabilidad);
router.put('/actividad/:id', verifyToken.verifyToken, updateActividad);
router.put('/obj_habi/:id_obj/:id_hab', verifyToken.verifyToken, updateObjetivoHabilidad);
router.put('/hab_act/:id_hab/:id_act', verifyToken.verifyToken, updateHabilidadActividad);

// Rutas para eliminar datos (también protegidas)
router.delete('/objetivo/:id', verifyToken.verifyToken, deleteObjetivo);
router.delete('/habilidad/:id', verifyToken.verifyToken, deleteHabilidad);
router.delete('/actividad/:id', verifyToken.verifyToken, deleteActividad);
router.delete('/obj_habi/:id_obj/:id_hab', verifyToken.verifyToken, deleteObjetivoHabilidad);
router.delete('/hab_act/:id_hab/:id_act', verifyToken.verifyToken, deleteHabilidadActividad);

module.exports = router;
