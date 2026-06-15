
// SeoulBeauty Phase 2.3
// YouTube Shorts Search Engine (Starter Version)

const fs = require("fs");

const SEARCH_RULES = require("../data/search-rules.json");

function calculateScore(video) {
  let score = 0;

  if (video.views >= 500) score += 1;
  if (video.views >= 5000) score += 2;
  if (video.views >= 50000) score += 3;

  const title = (video.title || "").toLowerCase();

  const positiveKeywords = [
    "review",
    "routine",
    "before after",
    "testing",
    "honest"
  ];

  const negativeKeywords = [
    "sale",
    "discount",
    "promo",
    "buy now"
  ];

  positiveKeywords.forEach(k => {
    if (title.includes(k)) score += 1;
  });

  negativeKeywords.forEach(k => {
    if (title.includes(k)) score -= 2;
  });

  return score;
}

function filterVideos(videos) {
  return videos.filter(v => calculateScore(v) >= 6);
}

// Placeholder until YouTube API is connected
const results = [];

fs.writeFileSync(
  "./data/videos.json",
  JSON.stringify(results, null, 2)
);

console.log("videos.json generated");
