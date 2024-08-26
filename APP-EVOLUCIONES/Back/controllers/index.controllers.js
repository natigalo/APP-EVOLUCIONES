const { Pool } = require('pg');
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'AppHC',
  password: '1234',
  port: 5432, // puerto por defecto de PostgreSQL
};

const pool = new Pool(config);

const getIntegracionTablas = async (req, res) => {
  try {
    const response = await pool.query('SELECT o."NAME_OBJ", h."NAME_HAB", a."NAME_ACT" FROM "HABILIDADES-ACTIVIDADES" AS ah INNER JOIN "HABILIDADES" h ON ah."ID_HAB2" = h."ID_HAB" INNER JOIN "ACTIVIDADES" a ON ah."ID_ACT2" = a."ID_ACT" INNER JOIN "OBJETIVO-HABILIDAD" AS oh ON ah."ID_HAB2" = oh."ID_HAB" INNER JOIN "OBJETIVOS" AS o ON o."ID_OBJ" = oh."ID_OBJ"')
    console.log(response.rows)
    res.send(response.rows)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
};

const getObjetivos = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM public."OBJETIVOS" ORDER BY "ID_OBJ" ASC ')
    console.log(response.rows)
    res.send(response.rows)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
};

const getHabiidades = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM public."HABILIDADES" ORDER BY "ID_HAB" ASC')
    console.log(response.rows)
    res.send(response.rows)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
};

const getActividades = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM public."ACTIVIDADES"  ORDER BY "ID_ACT" ASC ')
    console.log(response.rows)
    res.send(response.rows)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
};

// Funciónes  para insertar 
const createObjetivo = async (req, res) => {
  const { name } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query('INSERT INTO public."OBJETIVOS" ("NAME_OBJ") VALUES ($1) RETURNING *',
      [name]);
    res.status(201).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const createHabilidad = async (req, res) => {
  const { name } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    console.log(name)
    const response = await pool.query('INSERT INTO public."HABILIDADES" ("NAME_HAB") VALUES ($1) RETURNING *',
      [name]);
    res.status(201).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const createActividad = async (req, res) => {
  const { name } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query('INSERT INTO public."ACTIVIDADES" ("NAME_ACT") VALUES ($1) RETURNING *',
      [name]);
    res.status(201).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const createObjetivoHabilidad = async (req, res) => {
  const { name } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query('INSERT INTO public."OBJETIVO-HABILIDAD"("ID_OBJ", "ID_HAB") VALUES (?, ?); RETURNING *',
      [name]);
    res.status(201).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const createHabilidadActividad = async (req, res) => {
  const { name } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query('INSERT INTO public."HABILIDADES-ACTIVIDADES"("ID_HAB2", "ID_ACT2") VALUES ( ?, ?); RETURNING *',
      [name]);
    res.status(201).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
// Funciones para editar
const updateObjetivo = async (req, res) => {
  const { id, name } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query('UPDATE public."OBJETIVOS" SET "NAME_OBJ" = $1 WHERE "ID_OBJ" = $2 RETURNING *',
      [name, id]);
    res.status(200).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updateHabilidad = async (req, res) => {
  const { id, name } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query('UPDATE public."HABILIDADES" SET "NAME_HAB" = $1 WHERE "ID_HAB" = $2 RETURNING *',
      [name, id]);
    res.status(200).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updateActividad = async (req, res) => {
  const { id, name } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query('UPDATE public."ACTIVIDADES" SET "NAME_ACT" = $1 WHERE "ID_ACT" = $2 RETURNING *',
      [name, id]);
    res.status(200).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updateObjetivoHabilidad = async (req, res) => {
  const { id_obj, id_hab } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query('UPDATE public."OBJETIVO-HABILIDAD" SET "ID_HAB" = $1 WHERE "ID_OBJ" = $2 RETURNING *',
      [id_hab, id_obj]);
    res.status(200).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updateHabilidadActividad = async (req, res) => {
  const { id_hab, id_act } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query('UPDATE public."HABILIDADES-ACTIVIDADES" SET "ID_ACT2" = $1 WHERE "ID_HAB2" = $2 RETURNING *',
      [id_act, id_hab]);
    res.status(200).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Funciones para eliminar
const deleteObjetivo = async (req, res) => {
  const { id } = req.params; // Obtener el ID de los parámetros de la solicitud
  try {
    const response = await pool.query('DELETE FROM public."OBJETIVOS" WHERE "ID_OBJ" = $1 RETURNING *', [id]);
    if (response.rowCount === 0) {
      res.status(404).send('Objetivo no encontrado');
    } else {
      res.status(200).send(response.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteHabilidad = async (req, res) => {
  const { id } = req.params; // Obtener el ID de los parámetros de la solicitud
  try {
    const response = await pool.query('DELETE FROM public."HABILIDADES" WHERE "ID_HAB" = $1 RETURNING *', [id]);
    if (response.rowCount === 0) {
      res.status(404).send('Habilidad no encontrada');
    } else {
      res.status(200).send(response.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteActividad = async (req, res) => {
  const { id } = req.params; // Obtener el ID de los parámetros de la solicitud
  try {
    const response = await pool.query('DELETE FROM public."ACTIVIDADES" WHERE "ID_ACT" = $1 RETURNING *', [id]);
    if (response.rowCount === 0) {
      res.status(404).send('Actividad no encontrada');
    } else {
      res.status(200).send(response.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteObjetivoHabilidad = async (req, res) => {
  const { id_obj, id_hab } = req.params; // Obtener los IDs de los parámetros de la solicitud
  try {
    const response = await pool.query('DELETE FROM public."OBJETIVO-HABILIDAD" WHERE "ID_OBJ" = $1 AND "ID_HAB" = $2 RETURNING *', [id_obj, id_hab]);
    if (response.rowCount === 0) {
      res.status(404).send('Relación Objetivo-Habilidad no encontrada');
    } else {
      res.status(200).send(response.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteHabilidadActividad = async (req, res) => {
  const { id_hab, id_act } = req.params; // Obtener los IDs de los parámetros de la solicitud
  try {
    const response = await pool.query('DELETE FROM public."HABILIDADES-ACTIVIDADES" WHERE "ID_HAB2" = $1 AND "ID_ACT2" = $2 RETURNING *', [id_hab, id_act]);
    if (response.rowCount === 0) {
      res.status(404).send('Relación Habilidad-Actividad no encontrada');
    } else {
      res.status(200).send(response.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};


module.exports = { 
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
};
