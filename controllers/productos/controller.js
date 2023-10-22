import { PoolDB } from "../../db/db.js";

const pool = PoolDB();

export const getProductos = async () => {
  try {
    const result = await pool.query("SELECT * from products");

    if (!Array.isArray(result) || result.length < 1) {
      throw new Error("No se encontraron productos");
    }
    return result[0];
  } catch (error) {
    console.error("Error al traer todos los productos", error);
  }
};

export const getOneProducto = async (id) => {
  try {
    const result = await pool.query(`select * from products where id = ?`, id);
    return result[0][0];
  } catch (error) {
    console.error("Error al traer un producto", error);
  }
};

export const deleteProducto = async (id) => {
  try {
    const result = await pool.query("delete from products where id = ?", id);
    return result;
  } catch (error) {
    console.error("Error al eliminar un producto", error);
  }
};

export const addProducto = async (
  nombre,
  categoria,
  precio_d1,
  precio_olimpica,
  precio_exito,
  img
) => {
  try {
    const result = await pool.query(
      "insert into products(nombre, categoria, precio_d1, precio_olimpica, precio_exito, img) values(?, ?, ?, ?, ?, ?)",
      [nombre, categoria, precio_d1, precio_olimpica, precio_exito, img]
    );
    return result;
  } catch (error) {
    console.error("Error al agregar un producto", error);
  }
};

export const updateProduct = async (
  id,
  newNombre,
  newCategory,
  newPrecio_d1,
  newPrecio_olimpica,
  newPrecio_exito,
  newImg
) => {
  try {
    const result = await pool.query(
      "update products set nombre = ?, categoria = ?, precio_d1 = ?, precio_olimpica= ?, precio_exito = ? where id = ?",
      [
        newNombre,
        newCategory,
        newPrecio_d1,
        newPrecio_olimpica,
        newPrecio_exito,
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
    "select sum(precio * cantidad) as 'preciototal' from products  "
  );
  return precioTotal[0][0];
};
