import { PoolDB } from "../../db/db.js";
const pool = PoolDB();

export const getRolUser = async (userId) => {
  try {
    const values = [userId];
    let query = `
        SELECT r.nombre
        FROM roles r
        JOIN usuarios_roles ur ON r.id = ur.rol_id
        JOIN usuarios u ON ur.usuario_id = u.id
        WHERE u.id = $1;
    `;
    const result = await pool.query(query, values);

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron roles para el usuario");
    }

    return result.rows;
  } catch (error) {
    console.error("Error al obtener los roles del usuario", error);
    throw error;
  }
};
