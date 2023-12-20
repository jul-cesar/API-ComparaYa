import { PoolDB } from "../../db/db.js";

const pool = PoolDB();

export const getScrapingConfig = async () => {
  try {
    const result = await pool.query("SELECT * FROM scraping_config");

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron configuraciones de scraping");
    }
    return result.rows;
  } catch (error) {
    console.error("Error al obtener todas las configuraciones de scraping", error);
    throw error;
  }
};

export const updateScrapingConfig = async (
  newWebsite_name,
  newBase_url,
  newCard_selector,
  newNombre_selector,
  newPrecio_selector,
  newImg_selector,
  newPage_param_name,
  id
) => {
  try {
    const result = await pool.query(
      "UPDATE scraping_config SET website_name = $1, base_url = $2, card_selector = $3, nombre_selector = $4, precio_selector = $5, img_selector = $6, page_param_name = $7 WHERE id = $8",
      [
        newWebsite_name,
        newBase_url,
        newCard_selector,
        newNombre_selector,
        newPrecio_selector,
        newImg_selector,
        newPage_param_name,
        id,
      ]
    );

    if (!Array.isArray(result.rows) || result.rows.length < 1) {
      throw new Error("No se encontraron configuraciones de scraping");
    }
    return result.rows;
  } catch (error) {
    console.error("Error al actualizar la configuración de scraping", error);
    throw error;
  }
};
