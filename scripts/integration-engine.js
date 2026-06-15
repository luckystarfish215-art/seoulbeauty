
// SeoulBeauty Phase 2.8
// Integration Engine

const fs = require("fs");

const { filterQualityVideos } = require("./quality-filter");
const { matchProduct } = require("./product-matcher");
const { buildProductPage, savePage } = require("./build-product-pages");

const videos = require("../data/videos.json");

const filtered = filterQualityVideos(videos);

let generated = 0;

for (const video of filtered) {
  const product = matchProduct(video.title);

  if (!product) continue;

  const content = buildProductPage(video, product);

  savePage(product.slug, content);

  generated++;
}

console.log(`Generated ${generated} product pages`);
