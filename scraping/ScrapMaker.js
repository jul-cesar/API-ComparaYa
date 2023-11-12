import puppeteer from "puppeteer";
import {
  addProducto,
  deleteProducto,
  getProductos,
  updateProduct,
} from "../controllers/productos/controller.js";
import {
  addCategoria,
  getOneCategoriaByName,
} from "../controllers/categorias/controller.js";
import { getScrapingConfig } from "../controllers/scraping_config;/controller.js";

export const ScrapMaker = async (
  distribuidora,
  url,
  cardSelector,
  nombreSelector,
  precioSelector,
  imgSelector
) => {
  // const deleteDuplicados = async () => {
  //   const onDb = await getProductos();
  //   const unique = new Map();
  //   for (const elemento of onDb) {
  //     if (!unique.has(elemento.nombre) && !unique.has(elemento.categoria_id)) {
  //       unique.set(elemento.nombre, elemento);
  //     } else {
  //      const result =  await deleteProducto(elemento.id);
  //      console.log(`producto duplicado con id: ${result[0].insertId}`);
  //     }
  //   }

  // };

  // await deleteDuplicados();
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
        console.log(`producto nuevo agregado con id: ${result[0].insertId}`);
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
    const updatedProducts = [];
    const newProducts = [];

    for (const prod of data) {
      const existingProd = prodsOnDb.find(
        (p) =>
          p.nombre.toLowerCase() === prod.nombre.toLowerCase() &&
          p.categoria_id === prod.categoria_id
      );

      if (existingProd) {
        let needsUpdate = false;

        if (
          (prod.precio_d1 !== "N/A" &&
            prod.precio_d1 !== existingProd.precio_d1) ||
          (prod.precio_exito !== "N/A" &&
            prod.precio_exito !== existingProd.precio_exito) ||
          (prod.precio_olim !== "N/A" &&
            prod.precio_olim !== existingProd.precio_olim) ||
          (prod.imagen_url !== "N/A" &&
            prod.imagen_url !== existingProd.imagen_url)
        ) {
          needsUpdate = true;
        }

        if (needsUpdate) {
          await updateProduct(
            existingProd.id,
            prod.nombre,
            prod.imagen_url,
            prod.precio_d1,
            prod.precio_olim,
            prod.precio_exito,
            prod.categoria_id
          );
          updatedProducts.push(prod);
          console.log(`Productos updated: ${updatedProducts.length}`);
        }
      } else {
        newProducts.push(prod);
      }
    }
    return newProducts;
  };

  const scrap = async () => {
    try {
      console.log(`Scraping page: ${url}`);
      const browser = await puppeteer.launch({
        executablePath:
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        userDataDir:
          "C:\\Users\\julio\\AppData\\Local\\Google\\Chrome\\User Data",
      });

      const page = await browser.newPage();

      await page.goto(url);
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
            index = 2;
            break;
          case "olimpica":
            index = 2;
            break;
          default:
            index = 2;
            break;
        }
        let catIrre = pageUrl.pathname.split("/")[index];
        if (catIrre.includes("-")) {
          catIrre = catIrre = catIrre.replace(/-/g, " ");
          return catIrre;
        } else {
          return catIrre;
        }
      }

      const categoria = getCategory(distribuidora, url);

      if (categoria) {
        console.log(`Categoría de la página: ${categoria}`);
      } else {
        console.error(`No se pudo encontrar la categoría`);
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
      // if (distribuidora === "olimpica") {
      //   // Click on the element to open the dialog
      //   await page.click(".ph8-ns");

      //   // Wait for the dialog to appear
      //   await page.waitForSelector(".styles_modal__gNwvD", { visible: true });

      //   // Now, interact with the elements in the dialog, for example:
      //   await page.select(
      //     "#react-select-input-f68fd246-a3a7-4f81-acc3-a3bbae84fa94",
      //     "SUCRE"
      //   );
      //   await page.select(
      //     "#react-select-input-7725a165-6bca-4244-8d38-010a54876015",
      //     "Sincelejo"
      //   );
      //   // Type the city name
      //   await page.click(
      //     '."body > div:nth-child(142) > div > div > div.flex.justify-content.flex-row-reverse.bt.b--muted-4.ph6.ph8-ns.pv5.pv6-ns.vtex-styleguide-9-x-shadowTransition > div > span:nth-child(2) > button"'
      //   ); // Click the button to confirm the city

      //   // Wait for the dialog to disappear (assuming it closes after city selection)
      //   await page.waitForSelector(".your-dialog-selector", { hidden: true });

      //   // Continue with scrolling and scraping products
      //   await autoScroll(page);
      //   // ... Your scraping logic ...
      // }

      if (distribuidora === "exito" || distribuidora === "d1") {
        await autoScroll(page);
      }

      const categoryIdValue = await categoriaId();

      const productData = await page.evaluate(
        (
          categoryIdValue,
          distribuidora,
          cardSelector,
          nombreSelector,
          imgSelector,
          precioSelector
        ) => {
          const formatPrice = (priceText) => {
            const numericPrice = parseInt(
              priceText.replace("$", "").replace(/\./g, ""),
              10
            );
            return numericPrice;
          };

          const productsCards = document.querySelectorAll(cardSelector);
          return Array.from(productsCards).map((prod) => {
            const shadowRoot = prod.shadowRoot || prod;
            const imgEl = shadowRoot.querySelector(imgSelector);
            const nombreEl = shadowRoot.querySelector(nombreSelector);
            const precioEl = shadowRoot.querySelector(precioSelector);

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
                ? formatPrice(precioEl.innerText)
                : "N/A";
            } else if (distribuidora === "d1") {
              baseProduct.precio_d1 = precioEl
                ? formatPrice(precioEl.innerText)
                : "N/A";
            } else {
              baseProduct.precio_exito = precioEl
                ? formatPrice(precioEl.innerText)
                : "N/A";
            }
            return baseProduct;
          });
        },

        categoryIdValue,
        distribuidora,
        cardSelector,
        nombreSelector,
        imgSelector,
        precioSelector
      );

      const prodsOnDb = await getProductos();
      const updatedData = await updateProducts(productData, prodsOnDb);
      await addToDb(updatedData);

      console.log(productData);
      await browser.close();
    } catch (error) {
      console.error("Error during scraping:", error);
    }
  };

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const scrollInterval = 500;
        const scrollStep = 350;

        const scrollIntervalId = setInterval(() => {
          const maxScrollHeight = document.body.scrollHeight;
          window.scrollBy(0, scrollStep);
          totalHeight += scrollStep;

          if (totalHeight >= maxScrollHeight) {
            clearInterval(scrollIntervalId);
            resolve();
          }
        }, scrollInterval);
      });
    });
  }

  await scrap();
};

const getScrapingConfigV = await getScrapingConfig();
for (let config of getScrapingConfigV) {
  if (config.page_param_name > 0) {
    for (let i = 1; i <= config.page_param_name; i++) {
      await ScrapMaker(
        `${config.website_name}`,
        `${config.base_url}?page=${i}`,
        `${config.card_selector}`,
        `${config.nombre_selector}`,
        `${config.precio_selector}`,
        `${config.img_selector}`
      );
    }
  } else {
    await ScrapMaker(
      `${config.website_name}`,
      `${config.base_url}`,
      `${config.card_selector}`,
      `${config.nombre_selector}`,
      `${config.precio_selector}`,
      `${config.img_selector}`
    );
  }
}
