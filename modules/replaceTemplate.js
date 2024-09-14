// Card html'ini ve ürün bilgilerini parametre olarak alacak
// Card html'inin içerisinde değişken olarak tanımlanan değerlerin yerine ürünün bilgilerini ekleyecek bir fonk.

const replaceTemplate = (html, data) => {
  let output = html.replace("{%PRODUCTNAME%}", data.productName);

  output = output.replace("{%PRICE%}", data.price);
  output = output.replace("{%QUANTITY%}", data.quantity);
  output = output.replace(/{%IMAGE%}/g, data.image);
  output = output.replace(/{%ID%}/g, data.id);
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, data.description);
  output = output.replace(/{%FROM%}/g, data.from);

  //eğer ürün organik değilse {notorganic} değişkeni yerine not-organic class'ı ekle.
  if (data.organic === false) {
    output = output.replace("{%NOT_ORGANIC%}", "not-organic");
  }

  // oluşturduğumuz yeni - gğncellenmiş card html'ini döndürmek
  return output;
};

module.exports = replaceTemplate;
