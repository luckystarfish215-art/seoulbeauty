
// SeoulBeauty Phase 2.6
// Quality Filter Engine

function calculateScore(video) {
  let score = 0;

  const views = Number(video.viewCount || 0);
  const title = (video.title || "").toLowerCase();
  const channel = (video.channel || "").toLowerCase();

  if (views >= 500) score += 1;
  if (views >= 5000) score += 2;
  if (views >= 50000) score += 3;

  const positive = [
    "review",
    "routine",
    "before",
    "after",
    "testing",
    "honest"
  ];

  const negative = [
    "sale",
    "discount",
    "promo",
    "buy now",
    "giveaway"
  ];

  positive.forEach(k => {
    if (title.includes(k)) score += 1;
  });

  negative.forEach(k => {
    if (title.includes(k)) score -= 2;
  });

  if (channel.includes("official")) score -= 5;

  return score;
}

function removeDuplicates(videos) {
  const seen = new Set();

  return videos.filter(v => {
    if (seen.has(v.videoId)) return false;
    seen.add(v.videoId);
    return true;
  });
}

function filterQualityVideos(videos) {
  return removeDuplicates(videos)
    .filter(v => calculateScore(v) >= 4);
}

module.exports = {
  calculateScore,
  filterQualityVideos
};
