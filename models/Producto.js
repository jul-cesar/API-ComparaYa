// models/productModel.js

class Producto {
  constructor(
    id,
    nombre,
    imagen_url,
    precio_d1,
    precio_olim,
    precio_exito,
    categoria_id,
    nombre_categoria
  ) {
    this.id = id;
    this.nombre = nombre;
    this.imagen_url = imagen_url;
    this.precio_d1 = precio_d1;
    this.precio_olim = precio_olim;
    this.precio_exito = precio_exito;
    this.categoria_id = categoria_id;
    this.nombre_categoria = nombre_categoria;
  }
}
export default Producto;
