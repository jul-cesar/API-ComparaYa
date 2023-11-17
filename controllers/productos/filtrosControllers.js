import { PoolDB } from "../../db/db.js";
const pool = PoolDB();

export const getProductosByCategory = async (id) => {
  try {
    const query = "SELECT * FROM productos where categoria_id = ?";
    const values = [id];
    const result = await pool.query(query, values);

    if (!Array.isArray(result) || result.length < 1) {
      throw new Error("No se encontraron productos");
    }

    return result[0];
  } catch (error) {
    console.error("Error al traer todos los productos", error);
    throw error;
  }
};

export const getPaginatedCategories = async (categoria, page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const categoriaid = categoria;
    const query = "SELECT * FROM productos where categoria_id = ? LIMIT ?, ?";
    const values = [categoriaid, offset, limit];
    const result = await pool.query(query, values);

    if (!Array.isArray(result) || result.length < 1) {
      throw new Error("No se encontraron productos");
    }

    return result[0];
  } catch (error) {
    console.error("Error al traer todos los productos", error);
    throw error;
  }
};

export const getByMaxPrice = async (precioMaximo) => {
  try {
    const values = [precioMaximo, precioMaximo, precioMaximo];
    let query =
      "SELECT * FROM productos WHERE (precio_exito > 0 AND precio_exito < ?) OR (precio_olim > 0 AND precio_olim < ?) OR (precio_d1 > 0 AND precio_d1 < ?)";
    const result = await pool.query(query, values);

    if (!Array.isArray(result) || result.length < 1) {
      throw new Error("No se encontraron productos");
    }

    return result[0];
  } catch (error) {
    console.error("Error al traer todos los productos", error);
    throw error;
  }
};

export const getByDistribuidor = async (distribuidor) => {
  if (distribuidor === "olimpica") {
    distribuidor = "olim";
  }
  const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} > 0`;
  const result = await pool.query(query);
  return result[0];
};

export const getByMinPrinceAndDistribuidora = async (
  precioMaximo,
  distribuidor
) => {
  if (distribuidor === "olimpica") {
    distribuidor = "olim";
  }
  const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} < ? and  precio_${distribuidor.toLowerCase()} > 0 `;
  const values = [precioMaximo];
  const result = await pool.query(query, values);
  console.log(query, values);
  return result[0];
};

export const getByEverything = async (
  precioMaximo,
  distribuidor,
  categoriaid
) => {
  const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} < ? AND categoria_id = ?`;
  const values = [precioMaximo, categoriaid];
  const result = await pool.query(query, values);
  return result[0];
};

export const getByMaxPriceAndCategory = async (precioMaximo, categoriaid) => {
  const query =
    "SELECT * FROM productos WHERE (precio_exito <  ? and precio_exito > 0 OR precio_olim < ? and precio_olim> 0 OR precio_d1 < ? and precio_d1 > 0) AND categoria_id = ?";
  const values = [precioMaximo, precioMaximo, precioMaximo, categoriaid];
  const result = await pool.query(query, values);
  return result[0];
};

export const getByDistribuidorAndCategory = async (
  distribuidor,
  categoriaid
) => {
  if (distribuidor === "olimpica") {
    distribuidor = "olim";
  }
  const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} > 0 AND categoria_id = ?`;
  const values = [categoriaid];
  const result = await pool.query(query, values);
  return result[0];
};
