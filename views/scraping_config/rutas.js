import Express from "express";

import { getScrapingConfig } from "../../controllers/scraping_config;/controller.js";

const rutasScraping = Express.Router();

// Rutas para scraping
rutasScraping.route("/scrapingconfig").get(async (req, res) => {
  try {
    const users = await getScrapingConfig();
    if (!users) {
      return res
        .status(404)
        .send("No se encontraron usuarios o prende el xamp xd");
    }
    res.status(200).send(users);
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    res.status(500).send("Ocurrió un error al obtener los usuarios");
  }
});

export default rutasScraping;
