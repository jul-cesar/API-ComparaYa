import puppeteer from "puppeteer";
import {
  addProducto,
  getProductos,
  updateProduct,
} from "../controllers/productos/controller.js";
import {
  addCategoria,
  getOneCategoriaByName,
} from "../controllers/categorias/controller.js";

export const ScrapMaker = async (
  distribuidora,
  url,
  cardSelector,
  nombreSelector,
  precioSelector,
  imgSelector
) => {
  const addToDb = async (products) => {
    for (const prod of products) {
      const {
        nombre,
        imagen_url,
        precio_d1,
        precio_olim,
        precio_exito,
        categoria_id,
      } = prod;
      try {
        const result = await addProducto(
          nombre,
          imagen_url,
          precio_d1,
          precio_olim,
          precio_exito,
          categoria_id
        );
        console.log(result[0].insertId);
      } catch (error) {
        console.error("Error adding product to database:", error);
      }
    }
  };

  const getCategoryFromDb = async (categoria) => {
    try {
      const result = await getOneCategoriaByName(categoria);
      return result.id;
    } catch (e) {
      console.error("error al agregar categoria");
    }
  };

  const addCategoryToDb = async (categoria) => {
    try {
      const result = await addCategoria(categoria);
      return result[0].insertId;
    } catch (e) {
      console.error("error al agregar categoria");
    }
  };

  const updateProducts = async (data, prodsOnDb) => {
    for (const prod of data) {
      const existingProd = prodsOnDb.find(
        (p) =>
          p.nombre.toLowerCase() === prod.nombre.toLowerCase() &&
          p.categoria_id === prod.categoria_id
      );
      if (existingProd) {
        let needsUpdate = false;

        if (prod.precio_d1 !== 0 && prod.precio_d1 !== existingProd.precio_d1) {
          existingProd.precio_d1 = prod.precio_d1;
          needsUpdate = true;
        }
        if (
          prod.precio_exito !== 0 &&
          prod.precio_exito !== existingProd.precio_exito
        ) {
          existingProd.precio_exito = prod.precio_exito;
          needsUpdate = true;
        }
        if (
          prod.precio_olim !== 0 &&
          prod.precio_olim !== existingProd.precio_olim
        ) {
          existingProd.precio_olim = prod.precio_olim;
          needsUpdate = true;
        }

        if (needsUpdate) {
          const {
            id,
            nombre,
            imagen_url,
            precio_d1,
            precio_olim,
            precio_exito,
            categoria_id,
          } = existingProd;
          await updateProduct(
            id,
            nombre,
            imagen_url,
            precio_d1,
            precio_olim,
            precio_exito,
            categoria_id
          );
        }
      }
    }
    return data.filter(
      (prod) =>
        !prodsOnDb.some(
          (p) => p.nombre.toLowerCase() === prod.nombre.toLowerCase()
        )
    );
  };

  const scrap = async () => {
    try {
      console.log(`Scraping page: ${url}`);
      const browser = await puppeteer.launch({ headless: false });

      const page = await browser.newPage();

      await page.goto(url);
      await new Promise((r) => setTimeout(r, 3000));

      // // const productsExist = await page.$(cardSelector);
      // const categoria = await page.evaluate((categoriaSelector) => {
      //   const categoriaElement = document.querySelector(categoriaSelector);
      //   return categoriaElement ? categoriaElement.innerText : null;
      // }, categoriaSelector);

      function getCategory(distribuidora, url) {
        const pageUrl = new URL(url);
        let index;

        switch (distribuidora) {
          case "d1":
            index = 3;
            break;
          case "olimpica":
            index = 2;
            break;
          default:
            index = 2;
            break;
        }

        return pageUrl.pathname.split("/")[index];
      }

      const categoria = getCategory(distribuidora, url);

      if (categoria) {
        console.log(`Categoría de la página: ${categoria}`);
      } else {
        console.error(
          `No se pudo encontrar la categoría utilizando el selector: ${categoriaSelector}`
        );
      }

      const categoriaId = async () => {
        const categoriaIdd = await getCategoryFromDb(categoria);

        if (!categoriaIdd) {
          // La categoría no existe en la base de datos
          const categoriaIdN = await addCategoryToDb(categoria);
          console.log(
            `Categoría '${categoria}' agregada con ID ${categoriaIdN}`
          );
          return categoriaIdN;
        } else {
          return categoriaIdd;
        }
      };

      console.log("Waiting for card selector...");
      await page.waitForSelector(cardSelector, { timeout: 60000 });
      console.log("Card selector found.");

      console.log("Waiting for nombre selector...");
      await page.waitForSelector(nombreSelector, { timeout: 60000 });
      console.log("Nombre selector found.");

      console.log("Waiting for precio selector...");
      await page.waitForSelector(precioSelector, { timeout: 60000 });
      console.log("Precio selector found.");

      console.log("Waiting for img selector...");
      await page.waitForSelector(imgSelector, { timeout: 60000 });
      console.log("Img selector found.");

      await autoScroll(page);

      // cambiar ubicacion exito

      // if (distribuidora == "exito") {
      //   await page.click("body");

      // Esperar a que el modal se cierre

      // Verificar que el modal se ha cerrado
      // await page.waitForSelector('#wps-overlay-close-button', { visible: true });

      //   // Agregar un pequeño delay
      // new Promise((r) => setTimeout(r, 2000));

      //   // Hacer clic en el botón de cierre del modal
      //   await page.evaluate(() => {
      //     const closeButton = document.querySelector('#wps-overlay-close-button');
      //     closeButton.click();
      //   });

      //   // Esperar a que el modal se cierre
      //   await page.waitForSelector('#wps_popup > div', { hidden: true });

      //   // Verificar que el modal se ha cerrado
      //   const modal = await page.$('#wps_popup > div');
      //   if (modal === null) {
      //     console.log('El modal se ha cerrado correctamente');
      //   } else {
      //     console.log('El modal no se ha cerrado');
      //   }

      // Esperar a que el modal se cierre

      //   const input1Value = "sincelejo";
      //   const input2Value = "exito sincelejo";

      //   const inputs = document.querySelectorAll([
      //     ".css-1g6gooi > div > input",
      //   ]);

      //   const input1 = inputs[0];

      //   const input2 = inputs[1];

      //   const boton = document.querySelector(
      //     ".exito-geolocation-3-x-primaryButtonEnable"
      //   );
      //   await page.type(input1, input1Value)
      //   await page.type(input2, input2Value)
      //   await page.click(boton)
      // }
      const categoryIdValue = await categoriaId();

      const productData = await page.evaluate(
        (
          categoryIdValue,
          distribuidora,
          cardSelector,
          nombreSelector,
          precioSelector,
          imgSelector
        ) => {
          const productsCards = document.querySelectorAll(cardSelector);
          return Array.from(productsCards).map((prod) => {
            const shadowRoot = prod.shadowRoot || prod;
            const nombreEl = shadowRoot.querySelector(nombreSelector);
            const precioEl = shadowRoot.querySelector(precioSelector);
            const imgEl = shadowRoot.querySelector(imgSelector);

            const baseProduct = {
              nombre: nombreEl ? nombreEl.innerText : "N/A",
              imagen_url: imgEl ? imgEl.src : "N/A",
              precio_d1: "0",
              precio_olim: "0",
              precio_exito: "0",
              categoria_id: categoryIdValue,
            };

            if (distribuidora === "olimpica") {
              baseProduct.precio_olim = precioEl
                ? precioEl.innerText.replace("$", "")
                : "N/A";
            } else if (distribuidora === "d1") {
              baseProduct.precio_d1 = precioEl
                ? precioEl.innerText.replace("$", "")
                : "N/A";
            } else {
              baseProduct.precio_exito = precioEl
                ? precioEl.innerText.replace("$", "")
                : "N/A";
            }

            return baseProduct;
          });
        },
        categoryIdValue,
        distribuidora,
        cardSelector,
        nombreSelector,
        precioSelector,
        imgSelector
      );

      const prodsOnDb = await getProductos();
      const updatedData = await updateProducts(productData, prodsOnDb);
      await addToDb(updatedData);

      console.log(updatedData);
      await browser.close();
    } catch (error) {
      console.error("Error during scraping:", error);
    }
  };

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  await scrap();
};

for (let i = 1; i <= 6; i++) {
  await ScrapMaker(
    "exito",
    `https://tienda.exito.com/mercado/frutas-y-verduras?page=${i}`,
    ".vtex-search-result-3-x-galleryItem",
    ".vtex-store-components-3-x-productBrand",
    ".exito-vtex-components-4-x-PricePDP > span",
    ".vtex-product-summary-2-x-image"
  );
}

// await ScrapMaker(
//   "d1",
//   "https://domicilios.tiendasd1.com/ca/bebidas/BEBIDAS",
//   ".card-product-vertical.product-card-default",
//   ".bWeSzf",
//   ".bhSKFL",
//   ".prod__figure__img"
// );

// for (let i = 1; i <= 4; i++) {
//   await ScrapMaker(
//     ".t-heading-1",
//     "olim",
//     `https://www.olimpica.com/supermercado/desayuno?page=${i}`,
//     ".vtex-product-summary-2-x-container",
//     ".vtex-product-summary-2-x-productBrand",
//     ".vtex-product-price-1-x-sellingPrice--hasListPrice--dynamicF",
//     ".vtex-product-summary-2-x-imageNormal"
//   );
// }
