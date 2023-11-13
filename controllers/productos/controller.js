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

export const getProductosPMQ = async (precioMaximo) => {
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

export const getProductosPorDistribuidor = async (distribuidor) => {
  const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} > 0`;
  return await pool.query(query);
};

export const getProductosPMQYDistribuidor = async (precioMaximo, distribuidor) => {
  if(distribuidor === "olimpica"){
    distribuidor = "olim"
  }
  const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} < ? and  precio_${distribuidor.toLowerCase()} > 0 `;
  const values = [precioMaximo];
  return await pool.query(query, values);
};

export const getProductosPMQDistribuidorYCategoria = async (precioMaximo, distribuidor, categoriaid) => {
  const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} < ? AND categoria_id = ?`;
  const values = [precioMaximo, categoriaid];
  return await pool.query(query, values);
};

export const getProductosPorPrecioMaximoYCategoria = async (precioMaximo, categoriaid) => {
  const query = "SELECT * FROM productos WHERE (precio_exito <  ? and precio_exito > 0 OR precio_olim < ? and precio_olim> 0 OR precio_d1 < ? and precio_d1 > 0) AND categoria_id = ?";
  const values = [precioMaximo, precioMaximo, precioMaximo, categoriaid];
  return await pool.query(query, values);
};

export const getProductosPorDistribuidorYCategoria = async (distribuidor, categoriaid) => {
  const query = `SELECT * FROM productos WHERE precio_${distribuidor.toLowerCase()} > 0 AND categoria_id = ?`;
  const values = [categoriaid];
  return await pool.query(query, values);
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
