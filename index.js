const http = require("http");
const fs = require("fs");
const url = require("url");

// kendi oluşturduğumuz fonksiyonu import etme
const replaceTemplate = require("./modules/replaceTemplate");

// html şablon verilerine eriş.
let tempOverview = fs.readFileSync("./templates/overview.html", "utf-8");
let tempProduct = fs.readFileSync("./templates/product.html", "utf-8");
let tempCard = fs.readFileSync("./templates/card.html", "utf-8");

let jsonData = fs.readFileSync("./dev-data/data.json", "utf-8");

// json verisini js formatına çevirme
const data = JSON.parse(jsonData);

const server = http.createServer((req, res) => {
  console.log("API'a istek geldi");

  const { query, pathname } = url.parse(req.url, true);
  console.log(query);
  switch (pathname) {
    case "/overview":
      // meyveler dizisindeki eleman sayısı kadar kart oluştur.
      const cards = data.map((el) => replaceTemplate(tempCard, el));
      tempOverview = tempOverview.replace("{%PRODUCT_CARDS%}", cards);
      return res.end(tempOverview);
    case "/product":
      // 1 dizideki doğru elemanı bul

      const item = data.find((item) => item.id == query.id);
      // 2 detay ayfasının html'ini bulunan elamnın verilerine gçöre güncelle
      const output = replaceTemplate(tempProduct, item);
      // 3 güncel html'i client'a gönder
      return res.end(output);
    default:
      return res.end("<h1>Tanimlanmayan Yol</h1>");
  }
});

server.listen(3535, "127.0.0.1", () => {
  console.log("Server Tarafından Selamlar");
});
