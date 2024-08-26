const { Router } = require('express');
const router = Router();

const { 
    getIntegracionTablas, 
    getObjetivos, 
    getHabiidades, 
    getActividades, 
    createHabilidad, 
    createObjetivo, 
    createActividad, 
    createObjetivoHabilidad, 
    createHabilidadActividad, 
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
  
// Rutas para obtener datos
router.get('/integracion', getIntegracionTablas);
router.get('/objetivos', getObjetivos);
router.get('/habilidades', getHabiidades);
router.get('/actividades', getActividades);

// Rutas para crear datos
router.post('/objetivo', createObjetivo);
router.post('/habilidad', createHabilidad);
router.post('/actividad', createActividad);
router.post('/obj_habi', createObjetivoHabilidad);
router.post('/hab_act', createHabilidadActividad);

// Rutas para editar datos
router.put('/objetivo/:id', updateObjetivo);
router.put('/habilidad/:id', updateHabilidad);
router.put('/actividad/:id', updateActividad);
router.put('/obj_habi/:id_obj/:id_hab', updateObjetivoHabilidad);
router.put('/hab_act/:id_hab/:id_act', updateHabilidadActividad);

// Rutas para eliminar datos
router.delete('/objetivo/:id', deleteObjetivo);
router.delete('/habilidad/:id', deleteHabilidad);
router.delete('/actividad/:id', deleteActividad);
router.delete('/obj_habi/:id_obj/:id_hab', deleteObjetivoHabilidad);
router.delete('/hab_act/:id_hab/:id_act', deleteHabilidadActividad);


module.exports = router;