import Express from "express";
import Producto from "../../models/Producto.js";

import {
  getProductos,
  getOneProducto,
  deleteProducto,
  addProducto,
  updateProduct,
  SumPrice,
  getProductosPaginados,
  getProductosByCategory,
  getProductosPaginadosConCategoria,
  getProductosFiltradosExito,
  getProductosFiltradosD1,
  getProductosFiltradosOlim,
  getProductosFiltrados,
} from "../../controllers/productos/controller.js";

const rutasProductos = Express.Router();
//Rutas

utasProductos.route("/productos").get(async (req, res) => {
  try {
    const prods = await getProductos();
    if (!prods) {
      return res.status(404).send("No se encontraron productos");
    }
    res.status(200).send(prods);
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).send("Ocurrió un error al obtener los productos");
  }
});

// Ruta para obtener productos por categoría
rutasProductos.route("/productos/categoria/:id").get(async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const prods = await getProductosByCategory(id);
    if (!prods) {
      return res.status(404).send("No se encontraron productos en la categoría especificada");
    }
    res.status(200).send(prods);
  } catch (error) {
    console.error("Error al obtener los productos por categoría", error);
    res.status(500).send("Ocurrió un error al obtener los productos");
  }
});

// Ruta unificada para productos filtrados
rutasProductos.route("/productos/filtrados").get(async (req, res) => {
  try {
    const { preciomax, idcat, distribuidor } = req.query;
    const id = parseInt(idcat, 10);
    const precioMaximo = preciomax;

    const prods = await getProductosFiltrados(precioMaximo, id, distribuidor);
    if (!prods) {
      return res.status(404).send("No se encontraron productos con los filtros aplicados");
    }
    res.status(200).send(prods);
  } catch (error) {
    console.error("Error al obtener los productos filtrados", error);
    res.status(500).send("Ocurrió un error al obtener los productos");
  }
});

rutasProductos.route("/productos/:categoriaid/:page/:limit").get(async (req, res) => {
  try {
    const categoria_id = req.params.categoriaid
    const page = parseInt(req.params.page, 10);
    const limit = parseInt(req.params.limit, 10);
    const prods = await getProductosPaginadosConCategoria(categoria_id,page, limit);

    if (!prods) {
      return res
        .status(404)
        .send("No se encontraron productos o prende el xamp xd");
    }
    res.status(200).send(prods);
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).send("Ocurrió un error al obtener los productos");
  }
});


rutasProductos.route("/productos/:page/:limit").get(async (req, res) => {
  try {
    const page = parseInt(req.params.page, 10);
    const limit = parseInt(req.params.limit, 10);
    const prods = await getProductosPaginados(page, limit);

    if (!prods) {
      return res
        .status(404)
        .send("No se encontraron productos o prende el xamp xd");
    }
    res.status(200).send(prods);
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).send("Ocurrió un error al obtener los productos");
  }
});

rutasProductos.route("/productos/:id").get(async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw error("Id no proporcionado");
    }

    const result = await getOneProducto(id);
    if (!result) {
      return res.status(400).send("Producto no encontrado");
    }
    res.send(result);
  } catch (error) {
    console.error("Error al encontrar un producto con id dado");
  }
});

rutasProductos.route("/productos/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;

    const resultado = await deleteProducto(id);

    if (!resultado) {
      return res.status(404).send("Producto no encontrado");
    }

    res.status(204).send("Producto eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    res.status(500).send("Ocurrió un error al eliminar el producto");
  }
});

rutasProductos.route("/productos/").post(async (req, res) => {
  try {
    const {
      nombre,
      imagen_url,
      precio_d1,
      precio_olim,
      precio_exito,
      categoria_id,
      nombre_categoria,
    } = req.body;
    const newProduct = new Producto(
      null,
      nombre,
      imagen_url,
      precio_d1,
      precio_olim,
      precio_exito,
      categoria_id,
      nombre_categoria
    );
    const result = await addProducto(newProduct);
    if (!result) {
      return res.status(404).send("No se pudo agregar el producto");
    }
    res.status(201).send(result);
  } catch (error) {
    console.error("Error al agregar un producto", error);
  }
});

rutasProductos.route("/productos/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, precio_d1, precio_olimpica, precio_exito, img } = req.body;
    const result = await updateProduct(id, {
      nombre,
      precio_d1,
      precio_olimpica,
      precio_exito,
      img,
    });

    if (!result) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(result);
    console.error("Error al actualizar un producto", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al actualizar el producto" });
  } catch (error) {
    console.error(error);
  }
});

export default rutasProductos;
