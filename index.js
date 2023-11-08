import Express from "express";
import Cors from "cors";

import rutasProductos from "./views/productos/rutas.js";
import rutasCategorias from "./views/categorias/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasScraping from "./views/scraping_config/rutas.js";

export const app = Express();

const puerto = 4000;

app.use('/productos', rutasProductos); // This will apply to routes like "/productos", "/productos/:id", etc.
app.use('/categorias', rutasCategorias); // This will apply to routes like "/categorias", "/categorias/:id", etc.
app.use('/usuarios', rutasUsuarios); // This will apply to routes like "/usuarios", "/usuarios/:id", etc.
app.use('/scrapingconfig', rutasScraping); //
app.listen(puerto, () => {
  console.log(`Server corriendo en el puerto ${puerto}`);
});