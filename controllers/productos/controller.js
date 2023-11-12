import { PoolDB } from "../../db/db.js";
const pool = PoolDB();

export const getProductosPaginados = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;

    const query = "SELECT * FROM productos LIMIT ?, ?";
    const values = [offset, limit];
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

export const getProductosFiltrados = async (
  precioMaximo,
  categoriaid,
  distribuidor
) => {
  try {
    let query;
    const values = [precioMaximo, categoriaid];

    switch (distribuidor) {
      case "EXITO":
        query =
          "SELECT * FROM productos WHERE precio_exito < ? and precio_exito > 0 and categoria_id = ?";
        break;
      case "D1":
        query =
          "SELECT * FROM productos WHERE precio_d1 < ? and precio_d1 > 0 and categoria_id = ?";
        break;
      case "OLIMPICA":
        query =
          "SELECT * FROM productos WHERE precio_olim < ? and precio_olim > 0 and categoria_id = ?";
        break;
      default:
        query = `
          SELECT * FROM productos 
          WHERE 
            (precio_exito > 0 AND precio_exito < ?) OR 
            (precio_olim > 0 AND precio_olim < ?) OR 
            (precio_d1 > 0 AND precio_d1 < ?)
          AND categoria_id = ?`;
        values.push(precioMaximo, precioMaximo); // Agregar dos veces más para los otros distribuidores
    }

    const result = await pool.query(query, values);

    if (!Array.isArray(result) || result.length < 1) {
      throw new Error("No se encontraron productos");
    }

    return result[0];
  } catch (error) {
    console.error("Error al obtener productos filtrados", error);
    throw error;
  }
};

export const getProductosPaginadosConCategoria = async (
  categoria,
  page,
  limit
) => {
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

export const getProductos = async () => {
  try {
    const result = await pool.query("SELECT * from productos");

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
    const result = await pool.query(`select * from productos where id = ?`, id);
    return result[0][0];
  } catch (error) {
    console.error("Error al traer un producto", error);
  }
};

export const deleteProducto = async (id) => {
  try {
    const result = await pool.query("delete from productos where id = ?", id);
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
      "insert into productos(nombre, imagen_url, precio_d1, precio_olim, precio_exito, categoria_id) values(?, ?, ?, ?, ?, ?)",
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
      "update productos set nombre = ?, imagen_url = ?, precio_d1 = ?, precio_olim= ?, precio_exito = ?, categoria_id = ? where id = ?",
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
    "select sum(precio * cantidad) as 'preciototal' from productos  "
  );
  return precioTotal[0][0];
};
