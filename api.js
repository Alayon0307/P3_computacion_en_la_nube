//configuracion base de datos

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_practica',
  password: '12345',
  port: 5432,
});



const express = require('express');

const app = express();
app.use(express.json());

const port = 3000;


//endpoint para status
app.get('/status', async (req, res) => {
    try {
      res.json('pong');
    } catch (error) {
      res.status(500).json({ error: 'Error' });
    }
  });

  

// endpoint consulta de todos los usuarios
app.get('/directories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.send("No se pudieron obtener todos los usuarios" + err);
  }
});


//endpoint para crear usuario
app.post('/directories', async (req, res) => {
    const {name, email} = req.body;
    console.log(name,email);
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO usuarios (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
      );
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

//endpoint para obtenre un usuario
app.get('/directories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener el usuario: " + err);
  }
});


//endpoint para actualizar nombre y correo de un usuario
app.put('/directories/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    // Actualizar el nombre y el correo electrónico del usuario
    await pool.query('UPDATE usuarios SET name = $1, email = $2 WHERE id = $3', [name, email, id]);

    res.status(200).send("Usuario ACTUALIZADO");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar: " + err);
  }
});



//endpoint para actualizacion parcial
app.patch('/directories/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    // Si se proporcionó un nuevo nombre, actualizar el nombre del usuario
    if (name) {
      await pool.query('UPDATE usuarios SET name = $1 WHERE id = $2', [name, id]);
    }

    // Si se proporcionó un nuevo correo electrónico, actualizar el correo electrónico del usuario
    if (email) {
      await pool.query('UPDATE usuarios SET email = $1 WHERE id = $2', [email, id]);
    }

    res.status(200).send("Usuario ACTUALIZADO");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar el usuario: " + err);
  }
});


//endpoint para eliminar un usuario
app.delete('/directories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar el usuario
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);

    res.status(200).send("Usuario ELIMINADO");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar el usuario: " + err);
  }
});


app.listen(port, () => {
  console.log(`API corriendo el puerto 3000`);
});

