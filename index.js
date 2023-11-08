import Express from "express";
import Cors from "cors";

import rutasProductos from "./views/productos/rutas.js";
import rutasCategorias from "./views/categorias/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasScraping from "./views/scraping_config/rutas.js";

export const app = Express();
app.use(Cors())
const puerto = 4000;

app.use(rutasProductos);
app.use(rutasCategorias); 
app.use(rutasUsuarios); 
app.use(rutasScraping); 
app.listen(puerto, () => {
  console.log(`Server corriendo en el puerto ${puerto}`);
});