import { PoolDB } from "../../db/db.js";

const pool = PoolDB();

export const getCategorias = async () => {
  try {
    const result = await pool.query("SELECT * FROM categorias");

    if (!Array.isArray(result) || result.length < 1) {
      throw new Error("No se encontraron categorías");
    }
    return result[0];
  } catch (error) {
    console.error("Error al traer todas las categorías", error);
  }
};

export const getOneCategoria = async (id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categorias WHERE id = ?",
      id
    );
    return result[0][0];
  } catch (error) {
    console.error("Error al traer una categoría", error);
  }
};

export const getOneCategoriaByName = async (nombre) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categorias WHERE nombre = ?",
      [nombre]
    );
    return result[0][0];
  } catch (error) {
    console.error("Error al traer una categoría", error);
  }
};

export const deleteCategoria = async (id) => {
  try {
    const result = await pool.query("DELETE FROM categorias WHERE id = ?", [
      id,
    ]);
    return result;
  } catch (error) {
    console.error("Error al eliminar una categoría", error);
  }
};

export const addCategoria = async (nombre) => {
  try {
    const result = await pool.query(
      "INSERT INTO categorias (nombre) VALUES (?)",
      [nombre]
    );
    return result;
  } catch (error) {
    console.error("Error al agregar una categoría", error);
  }
};

export const updateCategoria = async (id, newNombre) => {
  try {
    const result = await pool.query(
      "UPDATE categorias SET nombre = ? WHERE id = ?",
      [newNombre, id]
    );
    return result;
  } catch (error) {
    console.error("Error al actualizar la categoría", error);
  }
};
