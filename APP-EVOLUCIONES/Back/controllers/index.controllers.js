const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const generateToken = require('../middlewares/authMiddleware')

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'AppHC',
  password: '1234',
  port: 5432, // puerto por defecto de PostgreSQL
};

const pool = new Pool(config); 

const login = async (req, res) => {
  const { correo, contrasena } = req.body;
  console.log(correo)
  console.log(contrasena)
  try {
    const response = await pool.query('SELECT * FROM public."USUARIOS" WHERE "Correo" = $1', [correo]);
    const user = response.rows[0];
    console.log(user)
    if (!user) { 
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

     // Verificar que las contraseñas no sean undefined o null
     if (!contrasena || !user.Contrasena) { // Usa 'Contraseña' en lugar de 'Contrasena'
      return res.status(400).json({ message: 'Datos de entrada inválidos' });
    }

    const validPassword = await bcrypt.compare(contrasena, user.Contrasena);

    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera el token usando la función desde authMiddleware
    const token = generateToken.generateToken(user.Id_Usuario);

    res.json({ token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const register = async (req, res) => {
  const { nombre, correo, contrasena, identificacion } = req.body; // Captura la identificación del cuerpo de la solicitud

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await pool.query('SELECT * FROM public."USUARIOS" WHERE "Correo" = $1 OR "Identificacion" = $2', [correo, identificacion]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'El correo o la identificación ya están registrados' });
    }

    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contrasena, 10); // 10 es el número de rondas de salting

    // Insertar el nuevo usuario en la base de datos
    const newUser = await pool.query(
      'INSERT INTO public."USUARIOS"("Nombre", "Identificacion", "Correo", "Contraseña") VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, identificacion, correo, hashedPassword, ]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser.rows[0] });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

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

const consultaBd = async (req, res) => {
  try {
    const response = await pool.query('SELECT version();')
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

const getObjetivoHabilidad = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM public."OBJETIVO-HABILIDAD" ')
    console.log(response.rows)
    res.send(response.rows)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
};

const getIdObjetivoHabilidad = async (req, res) => {
  const { id } = req.params; // Captura ID_OBJ desde los parámetros de la URL
  try {
    const response = await pool.query(
    `SELECT o."ID_OBJ", o."NAME_OBJ", h."ID_HAB", h."NAME_HAB" 
      FROM public."OBJETIVO-HABILIDAD" oh
      JOIN public."HABILIDADES" h ON oh."ID_HAB" = h."ID_HAB"
	    JOIN public."OBJETIVOS" o ON o."ID_OBJ" = oh."ID_OBJ"
      WHERE oh."ID_OBJ" = $1`,
      [id]
    );
    console.log(id);
    res.send(response.rows);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).send(error);
  }
};

const getIdHabilidadActividad = async (req, res) => {
  const { id } = req.params; // Captura ID_OBJ desde los parámetros de la URL
  try {
    const response = await pool.query(
    `SELECT h."ID_HAB", h."NAME_HAB", a."ID_ACT", a."NAME_ACT" 
      FROM public."HABILIDADES-ACTIVIDADES" ha
      JOIN public."HABILIDADES" h ON ha."ID_HAB2" = h."ID_HAB"
	    JOIN public."ACTIVIDADES" a ON a."ID_ACT" = ha."ID_ACT2"
      WHERE ha."ID_HAB2" = $1`,
      [id]
    );
    console.log(id);
    res.send(response.rows);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).send(error);
  }
};

const getIdActividadHabilidad = async (req, res) => {
  const { id } = req.params; // Captura ID_OBJ desde los parámetros de la URL
  try {
    const response = await pool.query(
    `SELECT h."ID_HAB", h."NAME_HAB", a."ID_ACT", a."NAME_ACT" 
      FROM public."HABILIDADES-ACTIVIDADES" ha
      JOIN public."HABILIDADES" h ON ha."ID_HAB2" = h."ID_HAB"
	    JOIN public."ACTIVIDADES" a ON a."ID_ACT" = ha."ID_ACT2"
      WHERE ha."ID_ACT2" = $1`,
      [id]
    );
    console.log(id);
    res.send(response.rows);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).send(error);
  }
};

const getIdHabilidadObjetivo = async (req, res) => {
  const { id } = req.params; // Captura ID_OBJ desde los parámetros de la URL
  try {
    const response = await pool.query(
    `SELECT h."ID_HAB", h."NAME_HAB", o."ID_OBJ", o."NAME_OBJ" 
      FROM public."OBJETIVO-HABILIDAD" oh
      JOIN public."HABILIDADES" h ON oh."ID_HAB" = h."ID_HAB"
	    JOIN public."OBJETIVOS" o ON o."ID_OBJ" = oh."ID_OBJ"
      WHERE oh."ID_HAB" = $1`,
      [id]
    );
    console.log(id);
    res.send(response.rows);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).send(error);
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
  console.log(req.body);
  const { IdObj, IdHab } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query(
      'INSERT INTO public."OBJETIVO-HABILIDAD"("ID_OBJ", "ID_HAB") VALUES ($1, $2) RETURNING *',
      [IdObj, IdHab] // Los valores deben ir en un solo array
    );
    res.status(201).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};


const createHabilidadActividad = async (req, res) => {
  console.log(req.body);
  const { IdHab, IdAct } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const response = await pool.query(
      'INSERT INTO public."HABILIDADES-ACTIVIDADES"("ID_HAB2", "ID_ACT2") VALUES ($1, $2) RETURNING *',
      [IdHab, IdAct] // Los valores deben ir en un solo array
    );
    res.status(201).send(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const createIntroduccion = async (req, res) => {
  console.log(req.body);
  const { IntroduccionText, IdUsuario } = req.body; // Obtener los datos del cuerpo de la solicitud

  try {
    const response = await pool.query(
      'INSERT INTO public."INTRODUCCION"("IntroduccionText", "IdUsuario") VALUES ($1, $2) RETURNING *',
      [IntroduccionText, IdUsuario] // Los valores deben ir en un solo array
    );
    res.status(201).send(response.rows[0]); // Enviar la fila insertada como respuesta
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    res.status(500).send({ message: 'Error al insertar en la base de datos', error });
  }
};


const getIntrByUser = async (req, res) => {
  const { id } = req.params; // Obtener idUsuario de los parámetros de la solicitud
  console.log(id)
  try {
    const response = await pool.query(
      'SELECT * FROM public."INTRODUCCION" WHERE "IdUsuario" = $1',
      [id] // Pasar idUsuario como parámetro
    );

    if (response.rows.length === 0) {
      return res.status(404).send({ message: 'No se encontraron registros para el usuario especificado' });
    }

    res.status(200).send(response.rows); // Enviar los registros obtenidos como respuesta
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    res.status(500).send({ message: 'Error al obtener datos de la base de datos', error });
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
  login,
  register,
  getIntegracionTablas, 
  getObjetivos, 
  getHabiidades, 
  getActividades,
  getObjetivoHabilidad,
  getIdObjetivoHabilidad,
  getIdActividadHabilidad,
  getIdHabilidadObjetivo,
  getIdHabilidadActividad,
  consultaBd,
  createHabilidad, 
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
};
