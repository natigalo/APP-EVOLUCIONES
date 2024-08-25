const { Router } = require('express');
const router = Router();

const { getIntegracionTablas, getObjetivos, getHabiidades, getActividades, createHabilidad, createObjetivo, createActividad, createObjetivoHabilidad, createHabilidadActividad } = require('../controllers/index.controllers.js');

router.get('/integracion', getIntegracionTablas);
router.get('/objetivos', getObjetivos);
router.get('/habilidades', getHabiidades);
router.get('/actividades', getActividades);

router.post('/objetivo', createObjetivo);
router.post('/habilidad', createHabilidad);
router.post('/actividad', createActividad);
router.post('/obj_habi', createObjetivoHabilidad);
router.post('/hab_act', createHabilidadActividad);

module.exports = router;