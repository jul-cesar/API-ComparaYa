import Express from "express";
import Cors from "cors";
import ServerlessHttp from "serverless-http";

import rutasProductos from "../views/productos/rutas.js";
import rutasCategorias from "../views/categorias/rutas.js";
import rutasUsuarios from "../views/usuarios/rutas.js";
import rutasScraping from "../views/scraping_config/rutas.js";

const app = Express();


app.use(Express.json());
app.use(Cors());


app.use('/productos', rutasProductos); 
app.use('/categorias', rutasCategorias); 
app.use('/usuarios', rutasUsuarios); 
app.use('/scrapingconfig', rutasScraping);

const handler = ServerlessHttp(app);

export const handlerServer = async (event, context) => {
  return handler(event, context);
};


/*
const puerto = 4000;
app.listen(puerto, () => {
  console.log(`Server corriendo en el puerto ${puerto}`);
});
*/
