import { PoolDB } from "../../db/db.js";
const pool = PoolDB();

export const getProductosPaginados = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;

    const query = "SELECT * FROM productos OFFSET $1 LIMIT $2";
    const values = [offset, limit];
    const result = await pool.query(query, values);

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron productos");
    }

    return result.rows;
  } catch (error) {
    console.error("Error al traer todos los productos", error);
    throw error;
  }
};

export const getProductos = async () => {
  try {
    const result = await pool.query("SELECT * from productos");

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron productos");
    }
    return result.rows;
  } catch (error) {
    console.error("Error al traer todos los productos", error);
  }
};

export const getOneProducto = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM productos WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al traer un producto", error);
  }
};

export const deleteProducto = async (id) => {
  try {
    const result = await pool.query("DELETE FROM productos WHERE id = $1", [
      id,
    ]);
    return result;
  } catch (error) {
    console.error("Error al eliminar un producto", error);
  }
};

export const addProducto = async (
  nombre,
  imagen_url,
  precio_d1,
  precio_olim,
  precio_exito,
  categoria_id
) => {
  try {
    const result = await pool.query(
      "INSERT INTO productos(nombre, imagen_url, precio_d1, precio_olim, precio_exito, categoria_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [nombre, imagen_url, precio_d1, precio_olim, precio_exito, categoria_id]
    );
    return result;
  } catch (error) {
    console.error("Error al agregar un producto", error);
  }
};

export const updateProduct = async (
  id,
  newNombre,
  newImagen_url,
  newPrecio_d1,
  newPrecio_olim,
  newPrecio_exito,
  newCategoria_id
) => {
  try {
    const result = await pool.query(
      "UPDATE productos SET nombre = $1, imagen_url = $2, precio_d1 = $3, precio_olim = $4, precio_exito = $5, categoria_id = $6 WHERE id = $7",
      [
        newNombre,
        newImagen_url,
        newPrecio_d1,
        newPrecio_olim,
        newPrecio_exito,
        newCategoria_id,
        id,
      ]
    );
    return result;
  } catch (error) {
    console.error("Error al actualizar el producto", error);
  }
};

export const SumPrice = async () => {
  const precioTotal = await pool.query(
    "SELECT SUM(precio * cantidad) AS preciototal FROM productos"
  );
  return precioTotal.rows[0];
};
