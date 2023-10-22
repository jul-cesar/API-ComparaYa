import Express from "express";
import Cors from "cors";

import rutasProductos from "./views/productos/rutas.js";

const app = Express();

const puerto = 4000;

app.use(Express.json());
app.use(Cors());
app.use(rutasProductos);

app.listen(puerto, () => {
  console.log(`Server corriendo en el puerto ${puerto}`);
});
