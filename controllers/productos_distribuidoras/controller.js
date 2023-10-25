import { PoolDB } from "../../db/db.js";
const pool = PoolDB();

export const addProductoDistribuidora = async (productoId, distribuidoraId, precio) => {
    try {
      const result = await pool.query(
        "INSERT INTO productos_distribuidoras(producto_id, distribuidora_id, precio) VALUES(?, ?, ?)",
        [productoId, distribuidoraId, precio]
      );
      return result;
    } catch (error) {
      console.error("Error al agregar un producto a una distribuidora", error);
    }
  };
  
  export const getPreciosProducto = async (productoId) => {
    try {
      const result = await pool.query(
        "SELECT distribuidora_id, precio FROM productos_distribuidoras WHERE producto_id = ?",
        [productoId]
      );
      return result[0];
    } catch (error) {
      console.error("Error al obtener los precios de un producto", error);
    }
  };
  
  export const updatePrecioProductoDistribuidora = async (productoId, distribuidoraId, newPrecio) => {
    try {
      const result = await pool.query(
        "UPDATE productos_distribuidoras SET precio = ? WHERE producto_id = ? AND distribuidora_id = ?",
        [newPrecio, productoId, distribuidoraId]
      );
      return result;
    } catch (error) {
      console.error("Error al actualizar el precio de un producto en una distribuidora", error);
    }
  };
  
  export const deleteProductoDistribuidora = async (productoId, distribuidoraId) => {
    try {
      const result = await pool.query(
        "DELETE FROM productos_distribuidoras WHERE producto_id = ? AND distribuidora_id = ?",
        [productoId, distribuidoraId]
      );
      return result;
    } catch (error) {
      console.error("Error al eliminar un producto de una distribuidora", error);
    }
  };
  