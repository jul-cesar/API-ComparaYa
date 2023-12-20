import { PoolDB } from "../../db/db.js";

const pool = PoolDB();

export const getCategorias = async () => {
  try {
    const result = await pool.query("SELECT * FROM categorias");

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron categorías");
    }
    return result.rows;
  } catch (error) {
    console.error("Error al traer todas las categorías", error);
    throw error;
  }
};

export const getOneCategoria = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM categorias WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al traer una categoría", error);
    throw error;
  }
};

export const getOneCategoriaByName = async (nombre) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categorias WHERE nombre = $1",
      [nombre]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al traer una categoría por nombre", error);
    throw error;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const result = await pool.query("DELETE FROM categorias WHERE id = $1", [
      id,
    ]);
    return result;
  } catch (error) {
    console.error("Error al eliminar una categoría", error);
    throw error;
  }
};

export const addCategoria = async (nombre) => {
  try {
    const result = await pool.query(
      "INSERT INTO categorias (nombre) VALUES ($1)",
      [nombre]
    );
    return result;
  } catch (error) {
    console.error("Error al agregar una categoría", error);
    throw error;
  }
};

export const updateCategoria = async (id, newNombre) => {
  try {
    const result = await pool.query(
      "UPDATE categorias SET nombre = $1 WHERE id = $2",
      [newNombre, id]
    );
    return result;
  } catch (error) {
    console.error("Error al actualizar la categoría", error);
    throw error;
  }
};
