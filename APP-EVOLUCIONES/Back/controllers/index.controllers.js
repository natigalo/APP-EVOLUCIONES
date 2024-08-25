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
module.exports = { getIntegracionTablas, getObjetivos, getHabiidades, getActividades, createHabilidad, createObjetivo, createActividad, createObjetivoHabilidad, createHabilidadActividad };