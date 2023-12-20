import { PoolDB } from "../../db/db.js";
const pool = PoolDB();

export const getProductosByCategory = async (categoriaId) => {
  try {
    const query = "SELECT * FROM productos WHERE categoria_id = $1";
    const values = [categoriaId];
    const result = await pool.query(query, values);

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron productos para la categoría");
    }

    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos por categoría", error);
    throw error;
  }
};

export const getPaginatedCategories = async (categoriaId, page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const query = "SELECT * FROM productos WHERE categoria_id = $1 LIMIT $2 OFFSET $3";
    const values = [categoriaId, limit, offset];
    const result = await pool.query(query, values);

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron productos");
    }

    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos paginados por categoría", error);
    throw error;
  }
};

export const getByMaxPrice = async (precioMaximo) => {
  try {
    const values = [precioMaximo, precioMaximo, precioMaximo];
    let query =
      "SELECT * FROM productos WHERE (precio_exito > 0 AND precio_exito < $1) OR (precio_olim > 0 AND precio_olim < $2) OR (precio_d1 > 0 AND precio_d1 < $3)";
    const result = await pool.query(query, values);

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron productos");
    }

    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos por precio máximo", error);
    throw error;
  }
};

export const getByDistribuidor = async (distribuidor) => {
  try {
    if (distribuidor === "olimpica") {
      distribuidor = "olim";
    }
    const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} > 0`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos por distribuidor", error);
    throw error;
  }
};

export const getByMinPrinceAndDistribuidora = async (
  precioMaximo,
  distribuidor
) => {
  try {
    if (distribuidor === "olimpica") {
      distribuidor = "olim";
    }
    const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} < $1 AND precio_${distribuidor.toLowerCase()} > 0`;
    const values = [precioMaximo];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos por precio mínimo y distribuidor", error);
    throw error;
  }
};

export const getByEverything = async (
  precioMaximo,
  distribuidor,
  categoriaId
) => {
  try {
    const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} < $1 AND categoria_id = $2`;
    const values = [precioMaximo, categoriaId];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos por precio máximo, distribuidor y categoría", error);
    throw error;
  }
};

export const getByMaxPriceAndCategory = async (precioMaximo, categoriaId) => {
  try {
    const query =
      "SELECT * FROM productos WHERE (precio_exito < $1 AND precio_exito > 0 OR precio_olim < $2 AND precio_olim > 0 OR precio_d1 < $3 AND precio_d1 > 0) AND categoria_id = $4";
    const values = [precioMaximo, precioMaximo, precioMaximo, categoriaId];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos por precio máximo y categoría", error);
    throw error;
  }
};

export const getByDistribuidorAndCategory = async (
  distribuidor,
  categoriaId
) => {
  try {
    if (distribuidor === "olimpica") {
      distribuidor = "olim";
    }
    const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} > 0 AND categoria_id = $1`;
    const values = [categoriaId];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener productos por distribuidor y categoría", error);
    throw error;
  }
};