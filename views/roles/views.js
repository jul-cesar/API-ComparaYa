import Express from "express";
import { getRolUser } from "../../controllers/roles/controller.js";

const rutasRoles = Express.Router();
rutasRoles.route("/roles/:id").get(async (req, res) => {
    try {
      const id = req.params.id;
  
      if (!id) {
        throw error("Id no proporcionado");
      }
  
      const result = await getRolUser(id);
      if (!result) {
        return res.status(400).send("Producto no encontrado");
      }
      res.send(result);
    } catch (error) {
      console.error("Error al encontrar un producto con id dado");
    }
  });

  export default rutasRoles