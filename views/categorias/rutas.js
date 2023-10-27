import Express from "express";

import {
  getCategorias,
  getOneCategoria,
  deleteCategoria,
  addCategoria,
  updateCategoria,
  getOneCategoriaByName,
} from "../../controllers/categorias/controller.js";

const rutasCategorias = Express.Router();

// Rutas para Categorías
rutasCategorias.route("/categorias").get(async (req, res) => {
  try {
    const cats = await getCategorias();
    if (!cats) {
      return res
        .status(404)
        .send("No se encontraron categorías o prende el xamp xd");
    }
    res.status(200).send(cats);
  } catch (error) {
    console.error("Error al obtener las categorías", error);
    res.status(500).send("Ocurrió un error al obtener las categorías");
  }
});

rutasCategorias.route("/categorias/:nombre").get(async (req, res) => {
  try {
    const nombre = req.params.nombre
    const cats = await getOneCategoriaByName(nombre);
    if (!cats) {
      return res
        .status(404)
        .send("No se encontraron categorías o prende el xamp xd");
    }
    res.status(200).send(cats);
  } catch (error) {
    console.error("Error al obtener las categorías", error);
    res.status(500).send("Ocurrió un error al obtener las categorías");
  }
});

rutasCategorias.route("/categorias/:id").get(async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw error("Id no proporcionado");
    }

    const result = await getOneCategoria(id);
    if (!result) {
      return res.status(400).send("Categoría no encontrada");
    }
    res.send(result);
  } catch (error) {
    console.error("Error al encontrar una categoría con el ID proporcionado");
  }
});

rutasCategorias.route("/categorias/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;

    const resultado = await deleteCategoria(id);

    if (!resultado) {
      return res.status(404).send("Categoría no encontrada");
    }

    res.status(204).send("Categoría eliminada con éxito");
  } catch (error) {
    console.error("Error al eliminar la categoría", error);
    res.status(500).send("Ocurrió un error al eliminar la categoría");
  }
});

rutasCategorias.route("/categorias/").post(async (req, res) => {
  try {
    const { nombre } = req.body;
    const result = await addCategoria(nombre);
    if (!result) {
      return res.status(404).send("No se pudo agregar la categoría");
    }
    res.status(201).send(result);
  } catch (error) {
    console.error("Error al agregar una categoría", error);
  }
});

rutasCategorias.route("/categorias/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const { newNombre } = req.body;
    const result = await updateCategoria(id, newNombre);

    if (!result) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(200).json(result);
    console.error("Error al actualizar una categoría", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al actualizar la categoría" });
  } catch (error) {
    console.error(error);
  }
});

export default rutasCategorias;
