import { PoolDB } from "../../db/db.js";

const pool = PoolDB();

export const getScrapingConfig = async () => {
  try {
    const result = await pool.query("SELECT * FROM scraping_config");

    if (!Array.isArray(result) || result.length < 1) {
      throw new Error("No se encontraron usuarios");
    }
    return result[0];
  } catch (error) {
    console.error("Error al traer todos los usuarios", error);
  }
};

export const upadteScrapingConfig = async (
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
      "update scraping_config set website_name = ?, base_url = ?, card_selector = ?, nombre_selector = ?, precio_selector = ?, img_selector = ?, page_param_name = ? where id = ?"[
        (newWebsite_name,
        newBase_url,
        newCard_selector,
        newNombre_selector,
        newPrecio_selector,
        newImg_selector,
        newPage_param_name,
        id)
      ]
    );

    if (!Array.isArray(result) || result.length < 1) {
      throw new Error("No se encontraron usuarios");
    }
    return result[0];
  } catch (error) {
    console.error("Error al traer todos los usuarios", error);
  }
};
