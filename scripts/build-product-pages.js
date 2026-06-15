
// SeoulBeauty Phase 2.7
// Product Page Generator (Starter)

const fs = require("fs");
const path = require("path");

function buildProductPage(video, product) {
  return `---
title: ${product.name}
brand: ${product.brand}
videoId: ${video.videoId}
---

# ${product.name}

Video Title:
${video.title}

Channel:
${video.channel}
`;
}

function savePage(slug, content) {
  const dir = "./generated-pages";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    path.join(dir, `${slug}.md`),
    content
  );
}

module.exports = {
  buildProductPage,
  savePage
};
