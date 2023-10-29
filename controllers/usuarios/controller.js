import { PoolDB } from "../../db/db.js";

const pool = PoolDB();

export const getUsuarios = async () => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");

    if (!Array.isArray(result) || result.length < 1) {
      throw new Error("No se encontraron usuarios");
    }
    return result[0];
  } catch (error) {
    console.error("Error al traer todos los usuarios", error);
  }
};

export const getOneUsuario = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = ?", id);
    return result[0][0];
  } catch (error) {
    console.error("Error al traer un usuario", error);
  }
};

export const deleteUsuario = async (id) => {
  try {
    const result = await pool.query("DELETE FROM usuarios WHERE id = ?", id);
    return result;
  } catch (error) {
    console.error("Error al eliminar un usuario", error);
  }
};

export const addUsuario = async (nombre, correo, contrasena) => {
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)",
      [nombre, correo, contrasena]
    );
    return result;
  } catch (error) {
    console.error("Error al agregar un usuario", error);
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
      "UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?",
      [newNombre, newCorreo, newContrasena, id]
    );
    return result;
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
  }
};
