import fs from "fs";

const products = JSON.parse(
  fs.readFileSync(
    new URL("../data/products.json", import.meta.url),
    "utf8"
  )
);

const videos = JSON.parse(
  fs.readFileSync(
    new URL("../data/videos.json", import.meta.url),
    "utf8"
  )
);

function matchProduct(videoTitle) {
  const title = (videoTitle || "").toLowerCase();

  for (const product of products) {
    const name = product.name.toLowerCase();

    // exact product name
    if (title.includes(name)) {
      return product;
    }

    // keyword matching
    const words = name
      .split(" ")
      .filter((w) => w.length > 3);

    const matchedWords = words.filter((w) =>
      title.includes(w)
    );

    if (matchedWords.length >= 2) {
      return product;
    }
  }

  return null;
}

const matched = [];

for (const video of videos) {
  const product = matchProduct(video.title);

  if (!product) continue;

  matched.push({
    videoId: video.videoId,
    title: video.title,
    channel: video.channel,
    publishedAt: video.publishedAt,

    productSlug: product.slug,
    productName: product.name,
    brand: product.brand,
    category: product.category
  });
}

fs.writeFileSync(
  new URL("../data/product-videos.json", import.meta.url),
  JSON.stringify(matched, null, 2)
);

console.log(
  `Matched ${matched.length} of ${videos.length} videos`
);
