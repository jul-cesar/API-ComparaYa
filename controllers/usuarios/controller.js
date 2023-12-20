import { PoolDB } from "../../db/db.js";

const pool = PoolDB();

export const getUsuarios = async () => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron usuarios");
    }
    return result.rows;
  } catch (error) {
    console.error("Error al traer todos los usuarios", error);
    throw error;
  }
};

export const getOneUsuario = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al traer un usuario", error);
    throw error;
  }
};

export const getUsuarioNombre = async (email) => {
  try {
    const result = await pool.query(
      "SELECT nombre FROM usuarios WHERE correo = $1",
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al traer el nombre de un usuario", error);
    throw error;
  }
};

export const getIdUser = async (email) => {
  try {
    const result = await pool.query(
      "SELECT id FROM usuarios WHERE correo = $1",
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al traer el id de un usuario", error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
    return result;
  } catch (error) {
    console.error("Error al eliminar un usuario", error);
    throw error;
  }
};

export const addUsuario = async (nombre, correo, contrasena) => {
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3)",
      [nombre, correo, contrasena]
    );
    return result;
  } catch (error) {
    console.error("Error al agregar un usuario", error);
    throw error;
  }
};

export const updateUsuario = async (
  id,
  newNombre,
  newCorreo,
  newContrasena
) => {
  try {
    const result = await pool.query(
      "UPDATE usuarios SET nombre = $1, correo = $2, contrasena = $3 WHERE id = $4",
      [newNombre, newCorreo, newContrasena, id]
    );
    return result;
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
    throw error;
  }
};
