
// SeoulBeauty Phase 2.7
// Product Matching Engine

const products = require("../data/products.json");

function matchProduct(videoTitle) {
  const title = (videoTitle || "").toLowerCase();

  for (const product of products) {
    const name = product.name.toLowerCase();

    if (title.includes(name)) {
      return product;
    }

    const words = name.split(" ").filter(w => w.length > 3);

    const matchedWords = words.filter(w => title.includes(w));

    if (matchedWords.length >= 2) {
      return product;
    }
  }

  return null;
}

module.exports = { matchProduct };
