import Express from "express";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const rutasComparation = Express.Router();


// Rutas para scraping
rutasComparation.route("/compare").post(async (req, res) => {
  try {
    const response = await fetch("https://localhost:7231/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error compare", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default rutasComparation;
