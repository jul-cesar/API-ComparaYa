import Express from "express";

import {
  getUsuarios,
  getOneUsuario,
  deleteUsuario,
  addUsuario,
  updateUsuario,
  getUsuarioNombre,
  getIdUser,
} from "../../controllers/usuarios/controller.js";

const rutasUsuarios = Express.Router();

// Rutas para Usuarios
rutasUsuarios.route("/usuarios").get(async (req, res) => {
  try {
    const users = await getUsuarios();
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

rutasUsuarios.route("/usuarios/:id").get(async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw error("Id no proporcionado");
    }

    const result = await getOneUsuario(id);
    if (!result) {
      return res.status(400).send("Usuario no encontrado");
    }
    res.send(result);
  } catch (error) {
    console.error("Error al encontrar un usuario con el ID proporcionado");
  }
});

rutasUsuarios.route("/usuarios/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;

    const resultado = await deleteUsuario(id);

    if (!resultado) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.status(204).send("Usuario eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el usuario", error);
    res.status(500).send("Ocurrió un error al eliminar el usuario");
  }
});

rutasUsuarios.route("/usuarios/").post(async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;
    console.log(nombre, correo, contrasena)
    const result = await addUsuario(nombre, correo, contrasena);
    if (!result) {
      return res.status(404).send("No se pudo agregar el usuario");
    }
    res.status(201).send(result);
  } catch (error) {
    console.error("Error al agregar un usuario", error);
  }
});

rutasUsuarios.route("/usuarios/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const { newNombre, newCorreo, newContrasena } = req.body;
    const result = await updateUsuario(id, newNombre, newCorreo, newContrasena);

    if (!result) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(result);
    console.error("Error al actualizar un usuario", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al actualizar el usuario" });
  } catch (error) {
    console.error(error);
  }
});

rutasUsuarios.route("/usuarionombre/:email").get(async (req, res) => {
  try {
    const email = req.params.email;

    const result = await getUsuarioNombre(email);

    if (!result) {
      return res.status(404).json({ error: "Nombre de usuario no encontrado" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});


rutasUsuarios.route("/usuarioid/:email").get(async (req, res) => {
  try {
    const email = req.params.email;

    const result = await getIdUser(email);

    if (!result) {
      return res.status(404).json({ error: "id no encontrado" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});

export default rutasUsuarios;
